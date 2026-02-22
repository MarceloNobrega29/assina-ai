import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { retellWebClient, agentId } from "./retell-webcall";

/* =========================
   Render React
========================= */
createRoot(document.getElementById("root")!).render(<App />);

/* =========================
   Integra UI do index.html
========================= */
function wireRetellUI() {
  const panel = document.getElementById("retell-panel");
  const fab = document.getElementById("retell-fab");

  const btnStart = document.getElementById("retell-start") as HTMLButtonElement | null;
  const btnStop = document.getElementById("retell-stop") as HTMLButtonElement | null;
  const btnClose = document.getElementById("retell-close");

  const statusEl = document.getElementById("retell-status");
  const errEl = document.getElementById("retell-error");

  if (!panel || !fab || !btnStart || !btnStop || !btnClose || !statusEl || !errEl) return;

  /* ===== helpers ===== */

  const setStatus = (txt: string) => (statusEl.textContent = txt);

  const setFabState = (state: "idle" | "connecting" | "active") => {
    (window as any).setRetellCallState?.(state);
  };

  const showError = (msg: string) => {
    (errEl as HTMLElement).style.display = "block";
    errEl.textContent = msg;
  };

  const clearError = () => {
    (errEl as HTMLElement).style.display = "none";
    errEl.textContent = "";
  };

  const openPanel = () => panel.classList.add("open");
  const closePanel = () => panel.classList.remove("open");

  /* ===== FAB abre painel ===== */

  fab.addEventListener("click", () => {
    clearError();
    openPanel();
  });

  btnClose.addEventListener("click", () => closePanel());

  /* =========================
     EVENTOS RETELL (REAL)
  ========================= */

  retellWebClient.on("call_started", () => {
    setStatus("Em chamada… você pode falar");
    btnStart.disabled = true;
    btnStop.disabled = false;

    // 🔥 muda botão para "Encerrar chamada"
    setFabState("active");
  });

  retellWebClient.on("call_ended", () => {
    setStatus("Chamada encerrada");
    btnStart.disabled = false;
    btnStop.disabled = true;

    // 🔥 volta botão para "Iniciar chamada"
    setFabState("idle");
  });

  /* =========================
     BOTÃO INICIAR
  ========================= */

  btnStart.addEventListener("click", async () => {
    clearError();

    setStatus("Conectando…");
    btnStart.disabled = true;

    // 🔥 muda para layout cinza "Conectando..."
    setFabState("connecting");

    try {
      const resp = await fetch(
        `/api/create-web-call?agent_id=${encodeURIComponent(agentId)}`,
        { method: "POST" }
      );

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Erro ao criar web call (${resp.status}): ${text}`);
      }

      const data = await resp.json();

      if (!data?.access_token) {
        throw new Error("Resposta inválida: access_token não veio.");
      }

      await retellWebClient.startCall({
        accessToken: data.access_token,
      });
    } catch (e) {
      console.error(e);

      setStatus("Falha ao conectar");
      btnStart.disabled = false;
      btnStop.disabled = true;

      // 🔥 volta botão para estado inicial
      setFabState("idle");

      showError(
        "Não consegui iniciar a chamada. Verifique /api/create-web-call e a RETELL_API_KEY."
      );
    }
  });

  /* =========================
     BOTÃO ENCERRAR
  ========================= */

  btnStop.addEventListener("click", () => {
    try {
      retellWebClient.stopCall();

      // 🔥 volta estado visual
      setFabState("idle");
    } catch (e) {
      console.error(e);
    }
  });
}

/* =========================
   Aguarda DOM existir
========================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireRetellUI);
} else {
  wireRetellUI();
}
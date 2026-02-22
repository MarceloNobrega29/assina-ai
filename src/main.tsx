import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { retellWebClient, agentId } from "./retell-webcall";

/* =========================
   Render React
========================= */
createRoot(document.getElementById("root")!).render(<App />);

/* =========================
   UI: somente botão flutuante
========================= */
function wireRetellUI() {
  const fab = document.getElementById("retell-fab") as HTMLButtonElement | null;

  // Mantemos esses ids porque talvez você ainda use em algum lugar,
  // mas o painel não aparece (CSS display:none !important).
  const btnStart = document.getElementById("retell-start") as HTMLButtonElement | null;
  const btnStop = document.getElementById("retell-stop") as HTMLButtonElement | null;
  const statusEl = document.getElementById("retell-status");
  const errEl = document.getElementById("retell-error");

  if (!fab || !btnStart || !btnStop || !statusEl || !errEl) return;

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

  /* =========================
     EVENTOS RETELL (REAL)
  ========================= */
  retellWebClient.on("call_started", () => {
    setStatus("Em chamada… você pode falar");
    btnStart.disabled = true;
    btnStop.disabled = false;
    setFabState("active");
  });

  retellWebClient.on("call_ended", () => {
    setStatus("Chamada encerrada");
    btnStart.disabled = false;
    btnStop.disabled = true;
    setFabState("idle");
  });

  /* =========================
     Função que inicia a call
  ========================= */
  async function startCall() {
    clearError();

    setStatus("Conectando…");
    btnStart.disabled = true;
    btnStop.disabled = true;
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
      if (!data?.access_token) throw new Error("Resposta inválida: access_token não veio.");

      await retellWebClient.startCall({ accessToken: data.access_token });
      // call_started vai disparar e mudar pra "active"
    } catch (e) {
      console.error(e);
      setStatus("Falha ao conectar");
      btnStart.disabled = false;
      btnStop.disabled = true;
      setFabState("idle");
      showError("Não consegui iniciar a chamada. Verifique /api/create-web-call e a RETELL_API_KEY.");
    }
  }

  /* =========================
     Função que encerra a call
  ========================= */
  function stopCall() {
    try {
      retellWebClient.stopCall();
      // call_ended vai disparar e voltar pra idle
    } catch (e) {
      console.error(e);
      // fallback visual
      setFabState("idle");
    }
  }

  /* =========================
     Clique no FAB controla tudo
     - idle -> start
     - connecting -> ignora
     - active -> stop
  ========================= */
  fab.addEventListener("click", () => {
    const state = (fab.dataset.state as "idle" | "connecting" | "active" | undefined) ?? "idle";

    if (state === "connecting") return;

    if (state === "active") {
      stopCall();
      return;
    }

    startCall();
  });

  /* =========================
     Se você clicar nos botões internos (caso use)
  ========================= */
  btnStart.addEventListener("click", () => startCall());
  btnStop.addEventListener("click", () => stopCall());

  // Estado inicial
  setFabState("idle");
  setStatus("Pronto para iniciar");
  btnStart.disabled = false;
  btnStop.disabled = true;
}

/* =========================
   Aguarda DOM existir
========================= */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireRetellUI);
} else {
  wireRetellUI();
}
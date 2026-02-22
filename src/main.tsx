import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
import { retellWebClient, agentId } from "./retell-webcall";

// liga UI do index.html com a web call
function wireRetellUI() {
  const panel = document.getElementById("retell-panel");
  const fab = document.getElementById("retell-fab");
  const btnStart = document.getElementById("retell-start") as HTMLButtonElement | null;
  const btnStop = document.getElementById("retell-stop") as HTMLButtonElement | null;
  const btnClose = document.getElementById("retell-close");
  const statusEl = document.getElementById("retell-status");
  const errEl = document.getElementById("retell-error");

  if (!panel || !fab || !btnStart || !btnStop || !btnClose || !statusEl || !errEl) return;

  const setStatus = (txt: string) => (statusEl.textContent = txt);
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

  fab.addEventListener("click", () => {
    clearError();
    openPanel();
  });

  btnClose.addEventListener("click", () => closePanel());

  retellWebClient.on("call_started", () => {
    setStatus("Em chamada… você pode falar");
    btnStart.disabled = true;
    btnStop.disabled = false;
  });

  retellWebClient.on("call_ended", () => {
    setStatus("Chamada encerrada");
    btnStart.disabled = false;
    btnStop.disabled = true;
  });

  btnStart.addEventListener("click", async () => {
    clearError();
    setStatus("Conectando…");
    btnStart.disabled = true;

    try {
      const resp = await fetch(`/api/create-web-call?agent_id=${encodeURIComponent(agentId)}`, {
        method: "POST",
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Erro ao criar web call (${resp.status}): ${text}`);
      }

      const data = await resp.json();
      if (!data?.access_token) throw new Error("Resposta inválida: access_token não veio.");

      await retellWebClient.startCall({ accessToken: data.access_token });
    } catch (e) {
      console.error(e);
      setStatus("Falha ao conectar");
      btnStart.disabled = false;
      btnStop.disabled = true;
      showError("Não consegui iniciar a chamada. Verifique /api/create-web-call e a RETELL_API_KEY.");
    }
  });

  btnStop.addEventListener("click", () => {
    try {
      retellWebClient.stopCall();
    } catch (e) {
      console.error(e);
    }
  });
}

// chama depois que o DOM existir
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", wireRetellUI);
} else {
  wireRetellUI();
}
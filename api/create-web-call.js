export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    res.status(500).send("Missing RETELL_API_KEY env var");
    return;
  }

  const agent_id = (req.query.agent_id || "").toString();
  if (!agent_id) {
    res.status(400).send("Missing agent_id");
    return;
  }

  try {
    // create-web-call endpoint (Retell) :contentReference[oaicite:5]{index=5}
    const r = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ agent_id })
    });

    const text = await r.text();

    if (!r.ok) {
      res.status(r.status).send(text);
      return;
    }

    // Retorna access_token pro navegador iniciar startCall({ accessToken }) :contentReference[oaicite:6]{index=6}
    res.status(200).type("application/json").send(text);
  } catch (err) {
    res.status(500).send(String(err));
  }
}
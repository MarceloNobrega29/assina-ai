// /api/create-web-call.js (ESM)

export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      res.statusCode = 405;
      res.end("Method Not Allowed");
      return;
    }

    const apiKey = process.env.RETELL_API_KEY;
    if (!apiKey) {
      console.error("Missing RETELL_API_KEY env var");
      res.statusCode = 500;
      res.end("Missing RETELL_API_KEY env var");
      return;
    }

    const agent_id = (req.query.agent_id || "").toString();
    if (!agent_id) {
      res.statusCode = 400;
      res.end("Missing agent_id");
      return;
    }

    const r = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id }),
    });

    const text = await r.text();

    if (!r.ok) {
      console.error("Retell API error:", r.status, text);
      res.statusCode = r.status;
      res.end(text);
      return;
    }

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 200;
    res.end(text);
  } catch (err) {
    console.error("Function crashed:", err);
    res.statusCode = 500;
    res.end(`Function crashed: ${String(err)}`);
  }
}
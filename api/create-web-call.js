export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) return res.status(500).send("Missing RETELL_API_KEY");

  const agent_id = (req.query.agent_id || "").toString();
  if (!agent_id) return res.status(400).send("Missing agent_id");

  const r = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agent_id }),
  });

  const text = await r.text();
  if (!r.ok) return res.status(r.status).send(text);

  res.status(200).type("application/json").send(text);
}
// netlify/functions/avwx.mjs
export default async (req) => {
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // "metar" | "taf" | "station"
  const icao = url.searchParams.get("icao");

  const allowed = ["metar", "taf", "station"];

  if (!allowed.includes(type)) {
    return new Response(JSON.stringify({ error: "Invalid type" }), {
      status: 400,
    });
  }

  if (!/^[A-Za-z]{3,4}$/.test(icao)) {
    return new Response(JSON.stringify({ error: "Invalid icao" }), {
      status: 400,
    });
  }

  const token = process.env.AVWX_TOKEN;

  const res = await fetch(`https://avwx.rest/api/${type}/${icao}`, {
    headers: { Authorization: `BEARER ${token}` },
  });

  const body = await res.text();
  return new Response(body, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/avwx" };

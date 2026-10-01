import { useState } from "react";
import type { Metar } from "./types";
import { MetarCard } from "./MetarCard";

function App() {
  const [icao, setIcao] = useState("EPKT");
  const [metar, setMetar] = useState<Metar | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMetar = async (station: string) => {
    setLoading(true);
    setError("");
    setMetar(null);

    try {
      const res = await fetch(`https://avwx.rest/api/metar/${station}`, {
        headers: { Authorization: `BEARER ${import.meta.env.VITE_AVWX_TOKEN}` },
      });
      if (!res.ok) throw new Error(`Błąd API: ${res.status}`);
      const data: Metar = await res.json();
      setMetar(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      setError("Nie udało się pobrać danych. Sprawdź kod lotniska.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMetar(icao.trim().toUpperCase());
  };

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>METAR</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={icao}
          onChange={(e) => setIcao(e.target.value)}
          placeholder="Kod ICAO (np. EPKT)"
          maxLength={4}
        />
        <button type="submit">Sprawdź</button>
      </form>

      {loading && <p>Ładowanie...</p>}
      {error && <p>{error}</p>}
      {metar && <MetarCard metar={metar} />}
    </main>
  );
}

export default App;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMetar } from "./api";
import { MetarCard } from "./MetarCard";
import styles from "./App.module.css";

function App() {
  const [icao, setIcao] = useState("EPKT");
  const [station, setStation] = useState(""); // zatwierdzone lotnisko

  const {
    data: metar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["metar", station],
    queryFn: () => fetchMetar(station),
    enabled: station !== "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStation(icao.trim().toUpperCase());
  };

  return (
    <main className={styles.app}>
      <h1>METAR</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={icao}
          onChange={(e) => setIcao(e.target.value)}
          placeholder="Kod ICAO (np. EPKT)"
          maxLength={4}
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          Sprawdź
        </button>
      </form>

      {isLoading && <p>Ładowanie...</p>}
      {isError && <p>Nie udało się pobrać danych. Sprawdź kod lotniska.</p>}
      {metar && <MetarCard metar={metar} />}
    </main>
  );
}

export default App;

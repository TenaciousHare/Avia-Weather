import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMetar, fetchStation } from "./api";
import { MetarCard } from "./MetarCard";
import { StationCard } from "./StationCard";
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

  const { data: stationInfo } = useQuery({
    queryKey: ["station", station],
    queryFn: () => fetchStation(station),
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
      {stationInfo && metar && (
        <StationCard station={stationInfo} obsTime={metar.time.dt} />
      )}
      {metar && stationInfo && (
        <MetarCard metar={metar} elevationFt={stationInfo.elevation_ft} />
      )}
    </main>
  );
}

export default App;

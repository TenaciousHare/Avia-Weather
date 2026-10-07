import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMetar, fetchStation, fetchTaf } from "./api";
import { MetarCard } from "./MetarCard";
import { StationCard } from "./StationCard";
import styles from "./App.module.css";
import { TafCard } from "./TafCard";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

function App() {
  const [icao, setIcao] = useState("EPKT");
  const [station, setStation] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const {
    data: metar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["metar", station],
    queryFn: () => fetchMetar(station),
    enabled: !!station,
    refetchInterval: 300_000,
  });

  const { data: stationInfo } = useQuery({
    queryKey: ["station", station],
    queryFn: () => fetchStation(station),
    enabled: !!station,
  });

  const { data: taf } = useQuery({
    queryKey: ["taf", station],
    queryFn: () => fetchTaf(station),
    enabled: !!station,
    refetchInterval: 300_000,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStation(icao.trim().toUpperCase());
  };

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1>METAR</h1>
        <button
          className={styles.themeToggle}
          type="button"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Przełącz motyw"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={icao}
          onChange={(e) => setIcao(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          placeholder="Kod ICAO lub IATA (np. EPKT, KTW)"
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
        <MetarCard
          key={station}
          metar={metar}
          elevationFt={stationInfo.elevation_ft}
        />
      )}
      {taf && <TafCard taf={taf} />}
    </main>
  );
}

export default App;

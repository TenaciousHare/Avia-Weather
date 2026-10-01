import type { Metar } from "./types";
import styles from "./MetarCard.module.css";

export function MetarCard({ metar }: { metar: Metar }) {
  const colors: Record<string, string> = {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.station}>
        <span>{metar.station}</span>
        <span
          className={styles.badge}
          style={{ backgroundColor: colors[metar.flight_rules] }}
        >
          {metar.flight_rules}
        </span>
      </h2>
      <p className={styles.row}>Temperatura: {metar.temperature.value}°C</p>
      <p className={styles.row}>
        Wiatr: {metar.wind_direction.value}° / {metar.wind_speed.value} kt{" "}
        {metar.wind_gust && <span> G{metar.wind_gust.value}</span>}
      </p>
      {metar.clouds.length === 0 ? (
        <p className={styles.row}>Bez chmur (CAVOK)</p>
      ) : (
        <ul className={styles.clouds}>
          {metar.clouds.map((cloud) => (
            <li key={cloud.repr}>
              {cloud.type} na {cloud.altitude * 100}ft
            </li>
          ))}
        </ul>
      )}
      <pre className={styles.raw}>{metar.raw}</pre>
    </section>
  );
}

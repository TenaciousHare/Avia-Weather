import type { Metar } from "./types";
import styles from "./MetarCard.module.css";
import { degreesToCardinal, knotsToMps } from "./utils/wind";
import { isaDeviation, relativeHumidity } from "./utils/atmosphere";

export function MetarCard({
  metar,
  elevationFt,
}: {
  metar: Metar;
  elevationFt: number;
}) {
  const colors: Record<string, string> = {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  };

  const dev = isaDeviation(metar.temperature.value, elevationFt);

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
      <p className={styles.row}>
        Temperatura: {metar.temperature.value}°C, Odchylenie ISA{" "}
        {dev > 0 ? "+" : ""}
        {dev}°C
      </p>
      <p className={styles.row}>
        Temp. punktu rosy: {metar.dewpoint.value}°C, Wilgotność względna:{" "}
        {relativeHumidity(metar.temperature.value, metar.dewpoint.value)}%
      </p>
      <p className={styles.row}>
        Ciśnienie: {metar.altimeter.value} {metar.units.altimeter}
      </p>
      <p className={styles.row}>
        Wiatr: {metar.wind_direction.value}° (
        {degreesToCardinal(metar.wind_direction.value)}){" "}
        {knotsToMps(metar.wind_speed.value)} m/s{" "}
        {metar.wind_gust && (
          <span> W porywach do {knotsToMps(metar.wind_gust.value)} m/s</span>
        )}
      </p>
      <p className={styles.row}>Widzialność: {metar.visibility.repr}</p>
      {metar.clouds.length === 0 ? (
        <p className={styles.row}>Bez chmur</p>
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

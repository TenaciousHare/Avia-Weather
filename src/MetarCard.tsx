import type { Metar } from "./types";
import styles from "./MetarCard.module.css";
import { degreesToCardinal, knotsToMps } from "./utils/wind";
import { isaDeviation, relativeHumidity } from "./utils/atmosphere";
import { flightRuleColor } from "./utils/flightRules";
import { feetToMeters, formatVisibility } from "./utils/units";

export function MetarCard({
  metar,
  elevationFt,
}: {
  metar: Metar;
  elevationFt: number;
}) {
  const dev = isaDeviation(metar.temperature.value, elevationFt);

  return (
    <section className={styles.card}>
      <h2 className={styles.station}>
        <span>{metar.station}</span>
        <span
          className={styles.badge}
          style={{ backgroundColor: flightRuleColor(metar.flight_rules) }}
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
      {metar.wind_direction && metar.wind_speed && (
        <p className={styles.row}>
          Wiatr:{" "}
          {metar.wind_direction.value !== null
            ? `${metar.wind_direction.value}° (${degreesToCardinal(metar.wind_direction.value)})`
            : metar.wind_direction.repr}{" "}
          {knotsToMps(metar.wind_speed.value)} m/s
          {metar.wind_gust &&
            `, w porywach do ${knotsToMps(metar.wind_gust.value)} m/s`}
        </p>
      )}
      <p className={styles.row}>
        Widzialność: {formatVisibility(metar.visibility)}
      </p>
      {metar.clouds.length === 0 ? (
        <p className={styles.row}>Bez chmur</p>
      ) : (
        <ul className={styles.clouds}>
          {metar.clouds.map((cloud) => (
            <li key={cloud.repr}>
              {cloud.type} na {feetToMeters(cloud.altitude * 100)}ft
            </li>
          ))}
        </ul>
      )}
      <pre className={styles.raw}>{metar.raw}</pre>
    </section>
  );
}

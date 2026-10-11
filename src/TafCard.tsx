import type { Taf } from "./types";
import styles from "./TafCard.module.css";
import { flightRuleColor, describeFlightRules } from "./utils/flightRules";
import { formatZulu } from "./utils/time";
import { degreesToCardinal, knotsToMps } from "./utils/wind";
import { feetToMeters, formatVisibility } from "./utils/units";
import { describeCloudCover } from "./utils/clouds";
import { describeForecastType } from "./utils/taf";

interface TafCardProps {
  taf: Taf;
}

export function TafCard({ taf }: TafCardProps) {
  return (
    <div className={styles.card}>
      <h2>Prognoza (TAF)</h2>
      <p className={styles.validity}>
        Ważność: {formatZulu(taf.start_time.dt)} → {formatZulu(taf.end_time.dt)}
      </p>

      {taf.forecast.map((period) => (
        <div className={styles.period} key={period.start_time.dt}>
          <div className={styles.periodHeader}>
            <h3 className={styles.periodType}>
              {period.type} ({describeForecastType(period.type)})
            </h3>
            <div className={styles.ruleLine}>
              <span
                className={styles.badge}
                style={{
                  backgroundColor: flightRuleColor(period.flight_rules),
                }}
              >
                {period.flight_rules}
              </span>
              <span className={styles.ruleDesc}>
                ({describeFlightRules(period.flight_rules)})
              </span>
            </div>
          </div>
          <p className={styles.row}>
            {formatZulu(period.start_time.dt)} →{" "}
            {formatZulu(period.end_time.dt)}
          </p>
          {period.probability !== null && (
            <p className={styles.row}>
              Z prawdopodobieństwem: {period.probability.repr}%
            </p>
          )}
          {period.wind_direction && period.wind_speed && (
            <p className={styles.row}>
              Wiatr:{" "}
              {period.wind_direction.value !== null
                ? `${period.wind_direction.value}° (${degreesToCardinal(period.wind_direction.value)})`
                : `${period.wind_direction.repr} (zmienny)`}{" "}
              {knotsToMps(period.wind_speed.value)} m/s
              {period.wind_gust &&
                `, w porywach do ${knotsToMps(period.wind_gust.value)} m/s`}
            </p>
          )}
          {period.visibility && (
            <p className={styles.row}>
              Widzialność: {formatVisibility(period.visibility)}
            </p>
          )}
          {period.clouds.length === 0 ? (
            <p className={styles.row}>Bez chmur</p>
          ) : (
            <ul className={styles.clouds}>
              {period.clouds.map((cloud) => (
                <li key={cloud.repr}>
                  {cloud.type} ({describeCloudCover(cloud.type)}) na{" "}
                  {feetToMeters(cloud.altitude * 100)}m
                </li>
              ))}
            </ul>
          )}
          <pre className={styles.raw}>{period.raw}</pre>
        </div>
      ))}
    </div>
  );
}

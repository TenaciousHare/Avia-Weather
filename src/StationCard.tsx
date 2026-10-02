import type { Station } from "./types";
import { formatLMT, minutesAgo, freshnessColor } from "./utils/time";
import styles from "./StationCard.module.css";

export function StationCard({
  station,
  obsTime,
}: {
  station: Station;
  obsTime: string;
}) {
  const age = minutesAgo(obsTime);
  return (
    <section className={styles.card}>
      <h2 className={styles.name}>{station.name}</h2>
      <p className={styles.sub}>
        {station.city}, {station.country}
      </p>
      <p className={styles.sub}>
        {formatLMT(obsTime, station.longitude)}{" "}
        <span style={{ color: freshnessColor(age) }}>{age} min</span>
      </p>
    </section>
  );
}

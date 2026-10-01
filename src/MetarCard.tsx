import type { Metar } from "./types";

export function MetarCard({ metar }: { metar: Metar }) {
  const colors: Record<string, string> = {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  };

  return (
    <section>
      <h2>
        {metar.station} —{" "}
        <span style={{ color: colors[metar.flight_rules] }}>
          {metar.flight_rules}
        </span>
      </h2>
      <p>Temperatura: {metar.temperature.value}°C</p>
      <p>
        Wiatr: {metar.wind_direction.value}° / {metar.wind_speed.value} kt{" "}
        {metar.wind_gust && <span> G{metar.wind_gust.value}</span>}
      </p>
      {metar.clouds.length === 0 ? (
        <p>Bez chmur (CAVOK)</p>
      ) : (
        <ul style={{ paddingLeft: 0, marginLeft: 0, listStyleType: "none" }}>
          {metar.clouds.map((cloud) => (
            <li key={cloud.repr}>
              {cloud.type} na {cloud.altitude * 100}ft
            </li>
          ))}
        </ul>
      )}
      <pre>{metar.raw}</pre>
    </section>
  );
}

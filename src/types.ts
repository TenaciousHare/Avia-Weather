export interface Metar {
  station: string;
  flight_rules: string;
  raw: string;
  temperature: { value: number };
  wind_direction: { value: number };
  wind_speed: { value: number };
  wind_gust: { value: number } | null;
  clouds: { type: string; altitude: number; repr: string }[];
}

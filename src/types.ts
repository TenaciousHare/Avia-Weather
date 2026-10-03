export interface Metar {
  station: string;
  flight_rules: string;
  raw: string;
  temperature: { value: number };
  wind_direction: { value: number | null; repr: string } | null;
  wind_speed: { value: number };
  wind_gust: { value: number } | null;
  clouds: { type: string; altitude: number; repr: string }[];
  time: { dt: string };
  visibility: { repr: string; value: number };
  dewpoint: { value: number };
  altimeter: { value: number };
  units: { altimeter: string };
}

export interface Station {
  name: string;
  city: string;
  country: string;
  elevation_ft: number;
  latitude: number;
  longitude: number;
}
export interface Taf {
  raw: string;
  start_time: AvwxTime;
  end_time: AvwxTime;
  forecast: TafPeriod[];
}

export interface AvwxTime {
  dt: string; // ISO: 2026-10-03T12:00:00Z"
  repr: string; // kod surowy "0312"
}

export interface TafPeriod {
  type: string; // "FROM" | "BECMG" | "TEMPO" ...
  probability: { value: number; repr: string; spoken: string } | null; // dla grup PROB30/40
  start_time: AvwxTime;
  end_time: AvwxTime;
  flight_rules: string;
  wind_direction: { value: number | null; repr: string } | null;
  wind_speed: { value: number } | null;
  wind_gust: { value: number } | null;
  visibility: { repr: string; value: number } | null;
  clouds: { type: string; altitude: number; repr: string }[];
  raw: string;
}

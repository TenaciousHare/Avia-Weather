export interface Metar {
  station: string;
  flight_rules: string;
  raw: string;
  temperature: { value: number };
  wind_direction: { value: number };
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

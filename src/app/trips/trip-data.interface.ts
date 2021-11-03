export interface TripData {
  id: number;
  countries: string[];
  name?: string;
  start: Date;
  end: Date;
  cities?: string[];
}

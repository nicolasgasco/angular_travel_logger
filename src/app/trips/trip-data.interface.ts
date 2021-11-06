export interface TripData {
  id: number;
  countries: string[];
  name?: string;
  dates: {
    start: Date;
    end: Date;
  };
  cities?: string[];
}

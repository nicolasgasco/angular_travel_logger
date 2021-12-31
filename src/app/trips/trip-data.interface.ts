export interface TripData {
  id: number;
  countries: string[];
  name?: string;
  dates: {
    start: any;
    end: any;
  };
  cities?: string[];
}

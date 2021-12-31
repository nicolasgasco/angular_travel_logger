export interface TripData {
  id: string;
  countries: string[];
  name?: string;
  dates: {
    start: any;
    end: any;
  };
  cities?: string[];
}

export interface Poi {
  adcode: string;
  address: string;
  city: [];
  district: string;
  id: string;
  location: {
    P: number,
    Q: number,
    lat: number,
    lng: number,
  } | '';
  name: string;
  typecode: string;
}

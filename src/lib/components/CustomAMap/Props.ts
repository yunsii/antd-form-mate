export interface Position {
  lng: number;
  lat: number;
}

export interface Poi {
  adcode: string;
  address: string;
  city: [];
  district: string;
  id: string;
  location: {
    P: number,
    Q: number,
  } & Position | '';
  name: string;
  typecode: string;
}

export interface MarkerData {
  id: number;
  name: string;
  description: string;
  type: string;
  lngLat: [lng: number, lat: number];
}

export type NewMarkPosition = {
  lngLat: [lat: number, lng: number];
};

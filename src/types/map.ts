export interface MarkerData {
  id: number;
  name: string;
  description: string;
  type: string;
  lngLat: [lat: number, lng: number];
}

export type NewMarkPosition = {
  lngLat: [lat: number, lng: number];
};

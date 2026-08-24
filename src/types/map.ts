export interface MarkerData {
  id: number;
  name: string;
  description: string;
  type: string;
  lngLat: [lng: number, lat: number];
}

export interface RelationData {
  id: number;
  name: string;
  color: string;
  originLngLat: [number, number];
  destinationLngLat: [number, number];
}

export type NewMarkPosition = {
  lngLat: [lat: number, lng: number];
};

export type MapMode = 'none' | 'location' | 'draw' | 'zone';

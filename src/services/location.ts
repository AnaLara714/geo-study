import { MarkerData } from '@/types/map';
import { API_URL } from '@/utils/api';

export async function getAllMarkersLocation() {
  const res = await fetch(API_URL + '/locations', { cache: 'no-cache' });

  if (!res) throw new Error('Falha ao carregar os marcadores do mapa');

  return res.json();
}

export async function createMarkerLocation(location: Omit<MarkerData, 'id'>) {
  const res = await fetch(API_URL + '/locations', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(location),
  });

  if (!res) throw new Error('Falaha ao criar localização no mapa');

  return res.json();
}

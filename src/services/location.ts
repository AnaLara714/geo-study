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

  if (!res) throw new Error('Falha ao criar localização no mapa');

  return res.json();
}

export async function deleteMarkerLocation(id?: number | null): Promise<void> {
  const res = await fetch(`${API_URL}/locations/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Falha ao remover a localização');
}

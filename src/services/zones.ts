import { ZoneData } from '@/types/zone';
import { API_URL } from '@/utils/api';

export async function getAllMarkersZones() {
  const res = await fetch(API_URL + '/zones', { cache: 'no-cache' });

  if (!res) throw new Error('Falha ao carregar as zonas do mapa');

  return res.json();
}

export async function createMarkerZones(location: Omit<ZoneData, 'id'>) {
  const res = await fetch(API_URL + '/zones', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(location),
  });

  if (!res) throw new Error('Falaha ao criar zonea no mapa');

  return res.json();
}

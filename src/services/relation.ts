import { RelationData } from '@/types/map';
import { API_URL } from '@/utils/api';

export async function getAllMarkersRelation() {
  const res = await fetch(API_URL + '/relations', { cache: 'no-cache' });

  if (!res) throw new Error('Falha ao carregar as relações do mapa');

  return res.json();
}

export async function createMarkerRelation(relation: Omit<RelationData, 'id'>) {
  const res = await fetch(API_URL + '/relations', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(relation),
  });

  if (!res) throw new Error('Falaha ao criar relação no mapa');

  return res.json();
}

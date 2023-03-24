import { read } from './httpSevices';

export async function apiGetAllCities() {
  const allCities = await read('/cities');

  return allCities;
}

export async function apiGetAllCandidates() {
  const allCandidates = await read('/candidates');

  return allCandidates;
}

export async function apiGetElections(citiesId) {
  const elections = await read(`/election?cityId=${citiesId}`);

  return elections;
}

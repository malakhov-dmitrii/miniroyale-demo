import useSWR, { Cache, useSWRConfig } from 'swr';

export const useCharacters = (page: number) => {
  const { cache } = useSWRConfig();

  const res = useSWR<CharactersData>(`https://swapi.dev/api/people/?page=${page}`);

  const dataWithCache = res.data?.results.map(item => {
    const id = item.url.split('/')[5];
    const cacheData = cache.get(`https://swapi.dev/api/people/${id}`);
    return cacheData?.data ?? item;
  });

  return {
    ...res,
    data: {
      ...res.data,
      results: dataWithCache,
    } as CharactersData,
  };
};

const getFallbackCharacter = (id?: string, cache?: Cache) => {
  if (!id || !cache) return undefined;

  const keys = cache.keys();
  if (!keys) return undefined;

  const v = [];
  for (const key of keys) {
    const value = cache.get(key);
    const data = value?.data?.results ?? [];
    v.push(...data);
  }
  const data = v.find(item => item.url.split('/')[5] === id);
  return data;
};

export const useCharacterItem = (id?: string) => {
  const { cache } = useSWRConfig();

  const res = useSWR<Character>(id ? `https://swapi.dev/api/people/${id}` : null, {
    fallbackData: getFallbackCharacter(id, cache),
  });

  return res;
};

export interface CharactersData {
  count: number;
  next: string;
  previous: null;
  results: Character[];
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: 'male' | 'female' | 'n/a';
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

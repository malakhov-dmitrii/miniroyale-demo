// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { test, describe, beforeAll, afterAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import HomePage from '@/pages/home/home-page';
import { SWRConfig } from 'swr';

const mockCharacterData = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
      starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('HomePage', () => {
  const server = setupServer(
    rest.get('https://swapi.dev/api/people/', (_req, res, ctx) => {
      return res(ctx.json(mockCharacterData));
    })
  );

  beforeAll(async () => {
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  test('renders home page without error', async () => {
    render(
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
          provider: () => new Map(),
        }}
      >
        <HomePage />
      </SWRConfig>
    );
    // await waitFor(() => screen.getByText(/Luke Skywalker/i));

    await delay(4000);

    screen.debug();

    // expect(screen.getByText(/Luke Skywalker/i)).toBeTruthy();
  });

  test.skip('displays character cards on load', async () => {
    const { findByText } = render(<HomePage />);
    const characterNameElement = await findByText(/Luke Skywalker/i);
    expect(characterNameElement).toBeTruthy();
  });

  test.skip('filters characters based on search input', async () => {
    const { getByPlaceholderText, findByText, queryByText } = render(<HomePage />);

    const searchInput = getByPlaceholderText(/Search on page.../i);
    userEvent.type(searchInput, 'Luke Skywalker');

    const characterNameElement = await findByText(/Luke Skywalker/i);
    expect(characterNameElement).toBeTruthy();

    const notFoundCharacterElement = queryByText(/Darth Vader/i);
    expect(notFoundCharacterElement).not.toBeTruthy();
  });
});

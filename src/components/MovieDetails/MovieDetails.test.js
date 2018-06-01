import React from 'react';
import MovieDetails from './';
import renderer from 'react-test-renderer';

import {
  movieDetailsUrl,
  TMDB_SEARCH_MOVIES_URL,
  normaliseCast,
  normaliseCrew
} from '../../utils';

it('renders MovieDetails with dummy API-data', () => {
  const movie = {
    details: {
      backdrop_path: 'dummyImageUrl.png',
      release_date: '1970-01-01',
      title: 'Dummy Title',
      overview: 'Dummy plot...'
    },
    crew: {
      director: [{ name: 'Dummy Director' }]
    },
    cast: [
      {
        cast_id: '1',
        profile_path: 'dummyProfilePath.png',
        name: 'First Actor Name',
        character: 'First Actor Character'
      },
      {
        cast_id: '2',
        profile_path: 'dummyProfilePath_2.png',
        name: 'Second Actor Name',
        character: 'Second Actor Character'
      }
    ]
  };

  const tree = renderer.create(<MovieDetails movie={movie} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders MovieDetails with real API-data', async () => {
  const movie = await fetch(
    `${TMDB_SEARCH_MOVIES_URL}&query=mission%20impossible`
  ).then(res => res.json());
  const credits = await fetch(movieDetailsUrl('954')).then(res => res.json());

  const tree = renderer
    .create(
      <MovieDetails
        movie={{
          cast: normaliseCast(credits.cast),
          crew: normaliseCrew(credits.crew),
          details: movie.results[0]
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

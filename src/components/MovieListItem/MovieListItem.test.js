import React from 'react';
import MovieListItem from './';
import renderer from 'react-test-renderer';

import { TMDB_SEARCH_MOVIES_URL } from '../../utils';

it('renders MovieListItem with dummy API-data', () => {
  const movie = {
    poster_path: 'dummyImageUrl.png',
    title: 'Movie Title',
    release_date: '1970-01-01'
  };
  const tree = renderer.create(<MovieListItem movie={movie} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders MovieListItem with real API-data', async () => {
  const movie = await fetch(
    `${TMDB_SEARCH_MOVIES_URL}&query=mission%20impossible`
  ).then(res => res.json());

  const tree = renderer
    .create(<MovieListItem movie={movie.results[0]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

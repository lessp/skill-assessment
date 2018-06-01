import React from 'react';
import ActorDetails from './';
import renderer from 'react-test-renderer';

import {
  actorCreditsUrl,
  actorDetailsUrl,
  normaliseActor,
  sortByPopularity
} from '../../utils';

it('renders ActorDetails with dummy API-data', () => {
  const actor = {
    details: {
      profile_path: 'dummyProfilePath.png',
      name: 'Dummy Actor Name',
      birthday: '1970-01-01',
      deathday: '2000-01-01',
      biography: 'Dummy biography.'
    },
    credits: [
      {
        id: '1',
        title: 'Dummy Movie Title',
        character: 'Dummy Character'
      }
    ]
  };

  const tree = renderer.create(<ActorDetails actor={actor} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ActorDetails with real API-data', async () => {
  const credits = await fetch(actorCreditsUrl('500')).then(res => res.json());
  const details = await fetch(actorDetailsUrl('500')).then(res => res.json());

  const tree = renderer
    .create(
      <ActorDetails
        actor={{
          details: normaliseActor(details),
          credits: sortByPopularity(credits.cast)
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

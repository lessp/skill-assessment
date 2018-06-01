import React from 'react';

import './ActorDetails.css';

const ActorDetails = ({ actor, handleBackTransition }) => (
  <article className="App-actorDetails">
    <header>
      <img src={actor.details.profile_path} alt={actor.details.name} />
      <div>
        <h4>{actor.details.name}</h4>
        <p>
          <span className="strong">Born: </span>
          {actor.details.birthday} in {actor.details.place_of_birth}
        </p>
        {actor.details.deathday !== null && (
          <p>
            <span className="strong">Dead: </span>
            {actor.details.deathday}
          </p>
        )}
        <p>
          {actor.details.biography.length > 134
            ? actor.details.biography.substring(0, 134) + '...'
            : actor.details.biography}
        </p>
      </div>
    </header>
    <section>
      <ul>
        {actor.credits.slice(0, 10).map(movie => (
          <li key={movie.id}>
            <p>
              {movie.title} ({movie.character})
            </p>
          </li>
        ))}
      </ul>
    </section>
  </article>
);

export default ActorDetails;

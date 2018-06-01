import React from 'react';

import './MovieDetails.css';

const MovieDetails = ({ movie, handleBackTransition, onActorSelect }) => (
  <article className="App-movieDetails">
    <header
      className="backdrop"
      style={{ backgroundImage: `url(${movie.details.backdrop_path})` }}
    >
      <h3>
        {movie.details.title}
        <span>({movie.details.release_date.substring(0, 4)})</span>
      </h3>
    </header>
    <section>
      <p>{movie.details.overview}</p>
      <div className="crew">
        <p>
          <span>Directed by: </span>
          {movie.crew.director.map(director => director.name).join(', ')}
        </p>
      </div>
      <ul className="cast">
        {movie.cast.map(actor => (
          <li onClick={_ => onActorSelect(actor)} key={actor.cast_id}>
            <img src={actor.profile_path} alt={actor.name} />
            <span>{actor.name}</span>
            <span>{actor.character}</span>
          </li>
        ))}
      </ul>
    </section>
  </article>
);

export default MovieDetails;

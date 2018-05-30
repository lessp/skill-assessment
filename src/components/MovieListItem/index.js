import React from 'react';

import './MovieListItem.css';

const MovieListItem = ({ movie, ...props }) => (
  <li className="App-movieListItem" {...props}>
    <figure>
      <img src={movie.poster_path} alt={movie.title} />
      <figcaption>
        {movie.title} <span>({movie.release_date.substring(0, 4)})</span>
      </figcaption>
    </figure>
  </li>
);

export default MovieListItem;

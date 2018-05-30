import React from 'react';

import './MovieList.css';

import MovieListItem from '../MovieListItem';

const MovieList = ({ movies, onMovieSelect }) => (
  <ul className="App-movieList">
    {movies.map(movie => (
      <MovieListItem
        onClick={_ => onMovieSelect(movie)}
        key={movie.id}
        movie={movie}
      />
    ))}
  </ul>
);

export default MovieList;

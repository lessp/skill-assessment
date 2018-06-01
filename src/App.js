import React, { Component } from 'react';

import './App.css';

import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';

import { BackButton, LoaderText } from './elements';

import {
  TMDB_SEARCH_MOVIES_URL,
  movieDetailsUrl,
  actorDetailsUrl,
  actorCreditsUrl,
  normaliseMovies,
  normaliseCrew,
  normaliseCast,
  normaliseActor,
  sortByPopularity
} from './utils';

const movieMachine = {
  idle: {
    SEARCH: 'searching'
  },
  searching: {
    SEARCH: 'searching',
    SEARCH_SUCCESS: 'movies',
    SEARCH_ERROR: 'error'
  },
  movies: {
    SEARCH: 'searching',
    SELECT_MOVIE: 'fetchMovie'
  },
  fetchMovie: {
    MOVIE_SUCCESS: 'movie',
    MOVIE_ERROR: 'error'
  },
  movie: {
    BACK: 'movies',
    SELECT_ACTOR: 'fetchActor'
  },
  actor: {
    BACK: 'movie'
  },
  fetchActor: {
    ACTOR_SUCCESS: 'actor',
    ACTOR_ERROR: 'error'
  },
  error: {
    SEARCH: 'searching'
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentState: 'idle',
      query: ''
    };

    this.handleMovieSelect = this.handleMovieSelect.bind(this);
    this.handleActorSelect = this.handleActorSelect.bind(this);
  }

  transition = action => {
    const currentState = this.state.currentState;
    const nextState = movieMachine[currentState][action.type];

    if (nextState) {
      const nextAdditionalState = this.command(nextState, action);

      this.setState({
        ...this.state,
        currentState: nextState,
        ...nextAdditionalState
      });
    }
  };

  command = (nextState, action) => {
    switch (nextState) {
      case 'searching':
        this.search(action.payload);
        break;
      case 'fetchMovie':
        this.fetchMovieDetails(action.payload);
        break;
      case 'fetchActor':
        this.fetchActorDetails(action.payload);
        break;
      case 'movies':
        return {
          movies: action.payload
        };
      case 'movie': {
        return {
          movie: action.payload
        };
      }
      case 'actor': {
        return {
          actor: action.payload
        };
      }
      case 'error':
        return {
          message: action.payload
        };
      default:
        break;
    }
  };

  search = query => {
    const encodedQuery = encodeURIComponent(query);

    fetch(`${TMDB_SEARCH_MOVIES_URL}&query=${encodedQuery}`)
      .then(res => res.json())
      .then(res => {
        this.transition({
          type: 'SEARCH_SUCCESS',
          payload: normaliseMovies(res.results)
        });
      })
      .catch(err => {
        this.transition({
          type: 'SEARCH_ERROR',
          payload: err.message
        });
      });
  };

  fetchMovieDetails = ({ id, ...movieDetails }) => {
    fetch(movieDetailsUrl(id))
      .then(res => res.json())
      .then(({ cast, crew }) => {
        this.transition({
          type: 'MOVIE_SUCCESS',
          payload: {
            details: movieDetails,
            cast: normaliseCast(cast),
            crew: normaliseCrew(crew)
          }
        });
      })
      .catch(err => {
        this.transition({
          type: 'MOVIE_ERROR',
          payload: err.message
        });
      });
  };

  fetchActorDetails = ({ id }) => {
    Promise.all([
      fetch(actorDetailsUrl(id)).then(res => res.json()),
      fetch(actorCreditsUrl(id)).then(res => res.json())
    ])
      .then(([details, credits]) => {
        this.transition({
          type: 'ACTOR_SUCCESS',
          payload: {
            details: normaliseActor(details),
            credits: sortByPopularity(credits.cast)
          }
        });
      })
      .catch(err => {
        this.transition({
          type: 'ACTOR_ERROR',
          payload: err.message
        });
      });
  };

  updateQuery = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSearchSubmit = e => {
    /* Enter Key */
    if (e.which === 13) {
      this.transition({
        type: 'SEARCH',
        payload: this.state.query
      });
    }
  };

  handleMovieSelect(movie) {
    this.transition({
      type: 'SELECT_MOVIE',
      payload: movie
    });
  }

  handleActorSelect(actor) {
    this.transition({
      type: 'SELECT_ACTOR',
      payload: actor
    });
  }

  render() {
    const { currentState, query } = this.state;

    const backButton = {
      movie: (
        <BackButton
          onClick={() =>
            this.transition({
              type: 'BACK',
              payload: this.state.movies
            })
          }
        />
      ),
      actor: (
        <BackButton
          onClick={() =>
            this.transition({
              type: 'BACK',
              payload: this.state.movie
            })
          }
        />
      )
    }[currentState];

    const searchText = {
      searching: 'Loading movie results...',
      fetchMovie: 'Fetching movie details...',
      fetchActor: 'Fetching actor details...'
    }[currentState];

    return (
      <div className="App" data-state={currentState}>
        <LoaderText text={searchText} />
        <header>
          {backButton}
          <SearchBar
            onKeyUp={this.handleSearchSubmit}
            onChange={this.updateQuery}
            value={query}
            isLoading={currentState === 'searching'}
          />
        </header>
        <main>
          {currentState === 'error' && (
            <p>
              Oops, that's an error. Here are the details: {this.state.message}
            </p>
          )}
          {currentState === 'movies' && (
            <MovieList
              onMovieSelect={this.handleMovieSelect}
              movies={this.state.movies}
            />
          )}
          {currentState === 'movie' && (
            <MovieDetails
              movie={this.state.movie}
              onActorSelect={this.handleActorSelect}
              handleBackTransition={() =>
                this.transition({
                  type: 'BACK',
                  payload: this.state.movies
                })
              }
            />
          )}
          {currentState === 'actor' && (
            <ActorDetails
              actor={this.state.actor}
              handleBackTransition={() =>
                this.transition({
                  type: 'BACK',
                  payload: this.state.movie
                })
              }
            />
          )}
          {/* Left this in deliberately */}
          {console.log('state: ', this.state)}
        </main>
      </div>
    );
  }
}

export default App;

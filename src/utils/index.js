export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB_SEARCH_MOVIES_URL = `${TMDB_BASE_URL}/search/movie?api_key=${
  process.env.REACT_APP_TMDB_API_KEY
}&language=en-US&page=1&include_adult=false`;

export const movieDetailsUrl = movieId =>
  `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

export const actorDetailsUrl = personId =>
  `https://api.themoviedb.org/3/person/${personId}?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=en-US`;

export const actorCreditsUrl = personId =>
  `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&language=en-US`;

export const TMDB_IMAGES_URL = `https://image.tmdb.org/t/p`;

export const normaliseMovies = movies =>
  movies.map(movie => {
    movie.poster_path = TMDB_IMAGES_URL + `/w500/${movie.poster_path}`;
    movie.backdrop_path = TMDB_IMAGES_URL + `/w1280/${movie.backdrop_path}`;
    return movie;
  });

export const normaliseCrew = crew =>
  crew.reduce((jobs, member) => {
    const crewPosition = member.job.toLowerCase();

    jobs[crewPosition] = jobs[crewPosition] || [];
    jobs[crewPosition].push(member);

    return jobs;
  }, {});

export const normaliseCast = cast =>
  cast.map(actor => {
    actor.profile_path = TMDB_IMAGES_URL + `/w300/${actor.profile_path}`;
    return actor;
  });

export const normaliseActor = actor => ({
  ...actor,
  profile_path: TMDB_IMAGES_URL + `/w300/${actor.profile_path}`
});

export const sortByPopularity = credits =>
  credits.slice().sort((x, y) => y.popularity - x.popularity);

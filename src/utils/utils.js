function durationToHoursAndMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours} ч. ${minutes} мин.`;
}

function filterShortFilm(moviesArray, shortFilmMaxDuration) {
  console.log('moviesArray in filterShortFilm:');
  console.log(moviesArray);
  const filteredMoviesArray = moviesArray.filter(
    (movieCard) => (Number(movieCard.duration) <= shortFilmMaxDuration),
  );
  return filteredMoviesArray;
}

function filterNameFilm(moviesArray, filmName) {
  const filteredMoviesArray = moviesArray.filter(
    (movieCard) => (
      (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
    ) || (
      (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
  );
  return filteredMoviesArray;
}

export { durationToHoursAndMinutes, filterShortFilm, filterNameFilm };

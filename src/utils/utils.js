function durationToHoursAndMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours} ч. ${minutes} мин.`;
}

function filterShortFilm(moviesArray, shortFilmMaxDuration) {
  console.log('moviesArray in filterShortFilm:');
  console.log(moviesArray);
  // debugger;
  const filteredMoviesArray = moviesArray.filter(
    (movieCard) => (Number(movieCard.duration) <= shortFilmMaxDuration),
  );
  return filteredMoviesArray;
}

function filterNameFilm(moviesArray, filmName) {
  // debugger;
  const filteredMoviesArray = moviesArray.filter(
    (movieCard) => (
      (String(movieCard.nameEN)).toLowerCase().includes((String(filmName)).toLowerCase())
    ) || (
      (String(movieCard.nameRU)).toLowerCase().includes((String(filmName)).toLowerCase())),
  );
  return filteredMoviesArray;
}

function synchronizeArrays(objectsArray1, objectsArray2) {
  // debugger;
  // eslint-disable-next-line prefer-const
  const newArray = objectsArray1;
  let k;
  for (let i = 0; i < objectsArray2.length; i += 1) {
    k = 0;
    while (k < objectsArray1.length) {
      if (newArray[k].id === objectsArray2[i].id) {
        newArray[k] = objectsArray2[i];
        break;
      }
      k += 1;
    }
  }
  return newArray;
}

function filterCurrentUserArray(currentUser, arrayToFilter) {
  return arrayToFilter.filter((atfi) => ((atfi.owner.email === currentUser.email)
  || (atfi.owner) === currentUser._id));
}

export {
  durationToHoursAndMinutes,
  filterShortFilm,
  filterNameFilm,
  synchronizeArrays,
  filterCurrentUserArray,
};

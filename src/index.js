const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: `${API_KEY}`,
  },
});

//Utils
function createMovies(movies, container) {
  container.replaceChildren("");

  movies.forEach((el) => {
    const movieContainer = document.createElement("div");
    const moviePhoto = document.createElement("img");

    moviePhoto.src = `https://image.tmdb.org/t/p/w300${el.poster_path}`;
    moviePhoto.alt = el.title;
    moviePhoto.classList.add("movie-img");
    movieContainer.classList.add("movie-container");

    movieContainer.appendChild(moviePhoto);
    container.appendChild(movieContainer);

    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${el.id}`;
    });
  });
}

function createCategory(categories, container) {
  container.replaceChildren("");
  categories.forEach((el) => {
    const categoryContainer = document.createElement("div");
    const categoryName = document.createElement("h3");

    categoryName.id = `id${el.id}`;
    categoryName.innerText = el.name;
    categoryName.classList.add("category-title");
    categoryContainer.classList.add("category-container");
    categoryName.addEventListener("click", () => {
      location.hash = `#category=${el.id}-${el.name}`;
    });

    categoryContainer.appendChild(categoryName);
    container.appendChild(categoryContainer);
  });
}

//llamadas a la API

async function getTrendingMoviesPreview() {
  try {
    const { data } = await api("/trending/movie/day");
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
  } catch (error) {
    console.error(error);
  }
}

async function getTrendingMovies() {
  try {
    const { data } = await api("/trending/movie/day");
    const movies = data.results;
    createMovies(movies, genericSection);
  } catch (error) {
    console.error(error);
  }
}

async function getCategoriesPreview() {
  try {
    const { data } = await api("/genre/movie/list");
    const categories = data.genres;
    createCategory(categories, categoriesPreviewList);
  } catch (error) {
    console.error(error);
  }
}

async function getMoviesByCategory(id) {
  try {
    const { data } = await api("discover/movie", {
      params: {
        with_genres: id,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection);
  } catch (error) {
    console.error(error);
  }
}

async function getMovieBySearch(query) {
  try {
    const { data } = await api("search/movie", {
      params: {
        query,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection);
  } catch (error) {
    console.error(error);
  }
}

async function getMovie(id) {
  try {
    const { data: movie } = await api(`movie/${id}`);
    const { data: similar } = await api(`/movie/${id}/similar`);
    console.log(movie.poster_path);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background = `linear-gradient( 180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17% ), url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    createCategory(movie.genres, movieDetailCategoriesList);
    createMovies(similar.results, relatedMoviesContainer);
  } catch (er) {
    console.error(er);
  }
}

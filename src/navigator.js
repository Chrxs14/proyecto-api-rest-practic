searchFormBtn.addEventListener("click", () => {
  location.hash = `#search=` + searchFormInput.value;
  headerCategoryTitle.textContent = `Resultados de: ${searchFormInput.value}`;
});

trendingBtn.addEventListener("click", () => {
  location.hash = `#trends`;
});

arrowBtn.addEventListener("click", () => {
  history.back();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
function navigator() {
  console.log({ location });
  document.body.scrollTop = 0;
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }
  document.documentElement.scrollTop = 0;
}

function homePage() {
  const headTitle = document.getElementById("head-title");
  headTitle.textContent = "PlatziMovies | Home";
  headerTitle.textContent = "Platzi Movies";
  headerCategoryTitle.textContent = `Platzi Movies`;
  console.log("HOME!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function trendsPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMovies();
  headerCategoryTitle.textContent = "trends";

  console.log("TRENDS!!");
}

function categoriesPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  console.log("CATEGORIES!!");

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");
  const nameTitle = categoryName.split("%20");
  if (nameTitle.length > 1) {
    headerCategoryTitle.textContent = `${nameTitle[0]} ${nameTitle[1]}`;
  } else {
    headerCategoryTitle.textContent = `${nameTitle[0]}`;
  }

  getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");
  console.log("MOVIE!!");

  const [_, movieId] = location.hash.split("=");
  getMovie(movieId);
}

function searchPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  console.log("SEARCH!!");

  const [_, query] = location.hash.split("=");
  getMovieBySearch(query);
}

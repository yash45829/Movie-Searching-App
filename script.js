const input = document.getElementById("input");
const search = document.getElementById("search");
const poster = document.getElementsByClassName("poster");
const title = document.getElementsByClassName("title");
const movieList = document.getElementsByClassName("movie-list");
const watch = document.getElementById("watch");
const button = document.getElementsByTagName("button");

// REDIRECTING TO MOVIE DETAIL PAGE
const movieDetails = (id) => {
  const movieId = id;
  console.log(movieId);
  localStorage.setItem("movieid", JSON.stringify(movieId));
  window.open("movie.html", "_blank");
};

//CARD FOPRMAT
const card = `<div class="movie-card">
              <img class="poster" src="" alt="image" id="poster">
              <h2 class="title" id="title"> </h2>
              <button id="watch">Watch Now</button>
              </div>`;

//LOADING MOVIE CARDS
const loadCard = (data) => {
  try {
    console.log(data);
    if (data == undefined) {
      movieList[0].innerHTML = "No movie found .";
    }

    data.forEach((movie, i) => {
      // console.log(movie.Poster);
      if (movie.Poster !== "") {
        movieList[0].insertAdjacentHTML("beforeend", card);
        let src = poster.item(i).attributes[1];
        src.value = movie.Poster;
        title[i].innerHTML = movie.Title;
        button[i + 1].addEventListener("click", () =>
          movieDetails(movie.imdbID)
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// FETCHING MOVIES FROM OMDB API USING MOVIE TITLE
const searchMovie = async () => {
  try {
    //   console.log("clicked");
    movieList[0].innerHTML = "Loading ...";
    const searchName = input.value;
    //   console.log(searchName);
    const apikey2 = `http://www.omdbapi.com/?apikey=230f8653&s=${searchName}&type=movie&page=1`;
    const response = await fetch(apikey2);
    movieList[0].innerHTML = "";
    const data = await response.json();
    loadCard(data.Search);
  } catch (e) {
    console.log(e);
  }
};

// DEFAULT MOVIES ON LANDING PAGE
const defaultMovies = async () => {
  try {
    //   console.log("clicked");
    movieList[0].innerHTML = "";
    const searchName = "dark knight";
    //   console.log(searchName);
    const apikey2 = `http://www.omdbapi.com/?apikey=230f8653&s=${searchName}&type=movie&page=1`;
    const response = await fetch(apikey2);
    movieList[0].innerHTML = "";
    const data = await response.json();
    loadCard(data.Search);
  } catch (e) {
    console.log(e);
  }
};

defaultMovies();

search.addEventListener("click", searchMovie);

input.addEventListener("keydown", (event) => {
  // console.log(event)
  if (event.code == "Enter") {
    searchMovie();
  }
});

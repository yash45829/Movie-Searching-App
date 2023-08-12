const input = document.getElementById("input");
const search = document.getElementById("search");
const poster = document.getElementsByClassName("poster");
const title = document.getElementsByClassName("title");
const movieList = document.getElementsByClassName("movie-list");

const searchMovie = async () => {
  try {
    //   console.log("clicked");
    movieList[0].innerHTML = "Loading ...";
    const searchName = input.value;
    //   console.log(searchName);
    const apikey2 = `http://www.omdbapi.com/?apikey=230f8653&s=${searchName}&type=movie&page=1`;
    //   const apiUrl = `https://www.omdbapi.com/?apikey=230f8653&t=${searchName}`;
    const response = await fetch(apikey2);
    //   console.log("data");
    movieList[0].innerHTML = "";
    // console.log(await response.text())
    const data = await response.json();
    //   console.log(data);
    loadCard(data.Search);
  } catch (e) {
    console.log(e);
  }
};
const card = `<div class="movie-card">
              <img class="poster" src="" alt="image" id="poster">
              <h2 class="title" id="title"> </h2>
              <button>Watch Now</button>
              </div>`;

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
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// searchMovie()
search.addEventListener("click", searchMovie);

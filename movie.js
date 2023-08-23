const title = document.getElementById("title");
const genre = document.getElementById("genre");
const rating = document.getElementById("rating");
const cast = document.getElementById("cast");
const synopsis = document.getElementById("synopsis");
const image = document.getElementById("image");

const searchMovie = async () => {
  try {
    const movieId = JSON.parse(localStorage.getItem("movieid"));
    // console.log("second", movieId);
    const apikey = `https://www.omdbapi.com/?apikey=230f8653&i=${movieId}`;
    const res = await fetch(apikey);
    const list = await res.json();
    console.log(list);

    let img = `<img src=${list.Poster} alt="" srcset=${list.Poster}></img>`; //image
    image.insertAdjacentHTML("beforeend", img);
    title.innerHTML = `${list.Title}`; //title
    genre.insertAdjacentHTML("beforeend", list.Genre); //genre
    rating.insertAdjacentHTML("beforeend", list.imdbRating); //rating
    synopsis.insertAdjacentHTML("beforeend", list.Plot); //plot
    cast.insertAdjacentHTML("beforeend", list.Actors); //actrors
  } catch (e) {
    console.log(e);
  }
};

searchMovie();

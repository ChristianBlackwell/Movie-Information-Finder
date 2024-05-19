document.getElementById("search-btn").addEventListener("click", searchMovie);
document
  .getElementById("movie-title")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchMovie();
    }
  });

document
  .getElementById("new-search-btn")
  .addEventListener("click", function () {
    clearPreviousResults();
    document.getElementById("new-search-container").style.display = "block";
    document.getElementById("new-search-btn").style.display = "none";
    document.getElementById("back-btn").style.display = "none";
  });

document
  .getElementById("new-movie-title")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchNewMovie();
    }
  });

document
  .getElementById("new-search-btn-2")
  .addEventListener("click", searchNewMovie);

document.getElementById("back-btn").addEventListener("click", function () {
  document.getElementById("search-results").style.display = "block";
  document.getElementById("movie-details").innerHTML = "";
  document.getElementById("back-btn").style.display = "none";
  document.getElementById("new-search-container").style.display = "none";
  document.getElementById("new-search-btn").style.display = "block";
});

async function searchMovie() {
  const movieTitle = document.getElementById("movie-title").value;
  if (movieTitle) {
    fetchMovieDetails(movieTitle);
  }
}

async function searchNewMovie() {
  const newMovieTitle = document.getElementById("new-movie-title").value;
  if (newMovieTitle) {
    clearPreviousResults();
    fetchMovieDetails(newMovieTitle);
    document.getElementById("new-movie-title").value = "";
  }
}

async function fetchMovieDetails(title, movieId) {
  const apiKey = "f9de8cf525d7c04bf292f416cbd81800"; // Your TMDb API key
  try {
    let movieDetails;
    if (movieId) {
      movieDetails = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
    } else {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${title}`
      );
      const data = await response.json();
      const movies = data.results.filter(
        (result) => result.media_type === "movie"
      );
      if (movies.length === 0) {
        displaySearchResults([]);
        return;
      }
      if (movies.length === 1) {
        movieId = movies[0].id;
        movieDetails = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
      } else {
        displaySearchResults(movies);
        return;
      }
    }
    const movieData = await movieDetails.json();
    displayMovieDetails(movieData);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

function displaySearchResults(results) {
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsList.innerHTML =
      "<p>No results found. Please try a different search term.</p>";
    document.getElementById("search-results").style.display = "block";
    return;
  }

  const maxResults = 5; // Limit the number of displayed results
  for (let i = 0; i < Math.min(results.length, maxResults); i++) {
    const result = results[i];
    if (result.media_type === "movie") {
      const listItem = document.createElement("li");
      listItem.textContent = result.title;
      listItem.addEventListener("click", function () {
        const movieTitle = result.title;
        const movieId = result.id;
        fetchMovieDetails(movieTitle, movieId);
        document.getElementById("search-results").style.display = "none";
        document.getElementById("back-btn").style.display = "inline-block";
      });
      resultsList.appendChild(listItem);
    }
  }
  document.getElementById("search-results").style.display = "block";
}

function displayMovieDetails(data) {
  const detailsDiv = document.getElementById("movie-details");
  const rating = parseFloat(data.vote_average).toFixed(1); // Format rating to one decimal place

  // Check if the release date and poster are available
  let releaseDateMessage = "";
  if (data.release_date) {
    releaseDateMessage = `<strong>Release Date:</strong> ${data.release_date}`;
  } else {
    releaseDateMessage = "<strong>Release Date:</strong> Not available yet";
  }

  // Check if the poster path is available
  let posterElement = "";
  if (data.poster_path) {
    posterElement = `<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title} Poster" class="movie-poster">`;
  }

  detailsDiv.innerHTML = `
    <div style="padding-top: 20px;">
        <h2>${data.title}</h2>
        <p>${data.overview}</p>
        <p>${releaseDateMessage}</p>
        <p><strong>Rating:</strong> ${rating}</p> <!-- Display formatted rating -->
        ${posterElement}
    </div>
  `;
  document.getElementById("search-container").style.display = "none";
  document.getElementById("new-search-container").style.display = "none";
  document.getElementById("new-search-btn").style.display = "block";
  document.getElementById("movie-title").value = "";
}

function clearPreviousResults() {
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";
  const detailsDiv = document.getElementById("movie-details");
  detailsDiv.innerHTML = "";
}

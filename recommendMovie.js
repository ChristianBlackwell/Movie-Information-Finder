// recommendMovie.js

// Function to recommend a random movie
async function recommendMovie() {
  const apiKey = "f9de8cf525d7c04bf292f416cbd81800"; // Your TMDb API key
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  // Hide search results list
  document.getElementById("search-results").style.display = "none";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      displayRecommendedMovie(randomMovie);
    } else {
      alert("No movies found. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching random movie:", error);
    alert("An error occurred while fetching movies. Please try again later.");
  }
}

// Function to display recommended movie details
function displayRecommendedMovie(movie) {
  const detailsDiv = document.getElementById("movie-details");

  // Check if the release date and poster are available
  let releaseDateMessage = "";
  if (movie.release_date) {
    releaseDateMessage = `<strong>Release Date:</strong> ${movie.release_date}`;
  } else {
    releaseDateMessage = "<strong>Release Date:</strong> Not available yet";
  }

  // Format rating to one decimal place
  const rating = parseFloat(movie.vote_average).toFixed(1);

  // Check if the poster path is available
  let posterElement = "";
  if (movie.poster_path) {
    posterElement = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" class="movie-poster">`;
  }

  detailsDiv.innerHTML = `
              <div style="padding-top: 20px;">
                  <h2>${movie.title}</h2>
                  <p>${movie.overview}</p>
                  <p>${releaseDateMessage}</p>
                  <p><strong>Rating:</strong> ${rating}</p>
                  ${posterElement}
                  <div id="button-container">
                    <button id="recommend-another-btn">Recommend another movie</button>
                    <button id="search-movie-btn">Search a movie</button>
                  </div>
              </div>
            `;

  // Style the buttons
  const buttonContainer = document.getElementById("button-container");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "20px";

  // Add event listeners to the buttons
  document
    .getElementById("recommend-another-btn")
    .addEventListener("click", recommendMovie);
  document
    .getElementById("search-movie-btn")
    .addEventListener("click", function () {
      document.getElementById("movie-details").innerHTML = ""; // Clear movie details
      document.getElementById("search-container").style.display = "block"; // Show search container
    });

  // Hide other sections
  document.getElementById("search-container").style.display = "none";
  document.getElementById("new-search-container").style.display = "none";
  document.getElementById("new-search-btn").style.display = "none"; // Hide "Search another movie" button
  document.getElementById("movie-title").value = "";

  // Hide the Recommend a Movie button from the main screen
  document.getElementById("recommend-btn").style.display = "none";
}

// Add event listener to the recommend movie button
document
  .getElementById("recommend-btn")
  .addEventListener("click", recommendMovie);

async function getTopRatedMovies() {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1&region=Brazil';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGU0ODAxNTYyNjM4NjUwNWM3OWMwZTRiYjZiZTQ0ZCIsIm5iZiI6MTcyNjI0NDM4NC45NzQ5NDEsInN1YiI6IjY2ZTQ2MjA5YzgxYjI0YjNmZTI0MmNjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.55rWxt3mU1pJWKmb5xgTvQFKsO_HrmQVccqDJcCpFYs'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results; // Retorna a lista de filmes
  } catch (err) {
    console.error('error:' + err);
  }
}

function createCard(imageSrc, title, text) {
  const card = document.createElement('div');
  card.className = 'card  bg-dark card-text col-12 col-md-3 mb-4';
  card.style.width = '18rem';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.className = 'card-img-top py-2';
  img.alt = '...';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body bg-dark';

  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title text-white';
  cardTitle.innerText = title;

  const cardText = document.createElement('p');
  cardText.className = 'card-text text-light';
  cardText.innerText = text;

  const buttonWatchNow = document.createElement('button');
  buttonWatchNow.className = 'btn btn-danger mb-2';
  buttonWatchNow.innerText = 'Assistir agora';

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  card.appendChild(img);
  card.appendChild(cardBody);

  card.appendChild(buttonWatchNow)

  return card;
}

async function displayTopRatedMovies() {
  const moviesContainer = document.getElementById('moviesContainer');
  const movies = await getTopRatedMovies();

  movies.forEach(movie => {
    const imageSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const title = movie.title;
    const text = movie.overview;

    const card = createCard(imageSrc, title, text);
    moviesContainer.appendChild(card);
  });
}

displayTopRatedMovies();

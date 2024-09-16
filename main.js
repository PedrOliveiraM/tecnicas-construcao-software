async function getTopRatedMovies() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=Brazil';
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
    return data.results;
  } catch (err) {
    console.error('error:' + err);
  }
}



async function getMovieByID(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  //const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1&region=Brazil';
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

async function displayTopRatedMovies() {
  const moviesContainer = document.getElementById('moviesContainer');
  const movies = await getTopRatedMovies();

  movies.forEach(movie => {
    const id = movie.id;
    const imageSrc = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
    const title = movie.title;
    const text = movie.overview;

    const card = createCard(id, imageSrc, title, text);
    moviesContainer.appendChild(card);
  });
}

function createCard(id, imageSrc, title, text) {
  const card = document.createElement('div');
  card.className = 'card  bg-dark card-text col-12 col-md-3 mb-4';
  card.style.width = '18rem';

  const movieId = document.createElement('span')
  movieId.innerText = id;
  movieId.className = 'd-none'

  const img = document.createElement('img');
  img.src = imageSrc;
  img.className = 'card-img-top py-2';
  img.alt = `Poster ${title}`;

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

  buttonWatchNow.addEventListener('click', function () {
    const filmeId = id;
    window.location.href = `detalhes.html?id=${filmeId}`;
  }
  )

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(movieId)

  card.appendChild(img);
  card.appendChild(cardBody);

  card.appendChild(buttonWatchNow)

  return card;
}




// mostrar os cards e abrir modal
displayTopRatedMovies();


const myModal = new bootstrap.Modal(document.getElementById('myModal'));

document.getElementById('comprarIngressoBtn').addEventListener('click', () => {
  myModal.show();
});

const myInput = document.getElementById('clienteIngresso');
myModal._element.addEventListener('shown.bs.modal', () => {
  myInput.focus();
});
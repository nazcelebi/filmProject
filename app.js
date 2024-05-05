import apiKey from './config.js'
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`;

let films = []; 

fetch(url)
    .then(response => response.json())
    .then(data => {
        films = data.results;
        displayFilms(films);
    })
    .catch(error => {
        console.error('Error:', error);
    });

document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchTerm === '') {
        alert('Lütfen aramak istediğiniz kelimeyi girin. ');
        return;
    }

    const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm));

    displayFilms(filteredFilms); 
});

function displayFilms(filmsToDisplay) {
    document.getElementById('filmRow').innerHTML = ''; 

    filmsToDisplay.forEach(film => {
        let filmBox = document.createElement('div');
        filmBox.classList.add('col-md-2', 'mb-4');

        let card = document.createElement('div');
        card.classList.add('card');

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('position-relative');

        let image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
        image.alt = film.title;

        let title = document.createElement('h5');
        title.classList.add('position-absolute', 'bottom-0', 'start-0', 'm-0', 'p-2', 'bg-dark', 'text-white', 'w-100', 'opacity-75');
        title.textContent = film.title;

        imageContainer.appendChild(image);
        imageContainer.appendChild(title);

        card.appendChild(imageContainer);

        filmBox.appendChild(card);

        filmBox.addEventListener('click', function() {
        window.location.href = `film.html?id=${film.id}`;
    });

        document.getElementById('filmRow').appendChild(filmBox);
    });
}

// Film detayları için API isteği
const apiKey = '13bfb3765a40e4eb67206f9a7c9edd73';
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');
const filmUrl = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}&language=en-US`;

fetch(filmUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById('filmTitle').innerText = data.title;
        document.getElementById('filmPlot').innerText = data.overview;

        const videoUrl = `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=${apiKey}&language=en-US`;

        fetch(videoUrl)
            .then(response => response.json())
            .then(videoData => {
                const trailerKey = videoData.results[0].key;
                const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

                const trailerFrame = document.createElement('iframe');
                trailerFrame.setAttribute('width', '70%');
                trailerFrame.setAttribute('height', '600');
                trailerFrame.setAttribute('src', trailerUrl);
                trailerFrame.setAttribute('frameborder', '0');
                trailerFrame.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
                trailerFrame.setAttribute('allowfullscreen', '');

                document.getElementById('trailer').appendChild(trailerFrame);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });

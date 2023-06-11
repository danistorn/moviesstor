const api = axios.create({  //Creao una INSTANCIA de AXIOS. Dentro creo una configuracion por defecto.
    baseURL: 'http://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,

    },
});




// Utils (codigo a reutilizar)

function createMovies(movies, container) { //el container es en dónde tenemos que hacer la inserción. El appendChild de nuestras peliculas.
    container.innerHTML = ''; //se limpia para evitar el error del duplicado de datos.
    
    movies.forEach(movie => {
        // const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList') //Esta linea se puede borrar
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src', 
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
        );
        
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}



function createCategories(categories, container) {   //No es asincrona porque no es acá que hace peticiones a los APIs.
    container.innerHTML = ''; //limpiamos el container en cada carga


    categories.forEach(category => { //Ahora creo lo que en algun momento hubiese creado en el HTML, pero aca, en el JS.        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');    
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id); //El 1er id seria el atributo id, todo lo otro (el id y el category.name) forman una sola cosa. En css puedo ver que el color es la palabra "id" seguida por el numero del id. Por eso... id120 xej.  
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name);
               

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });

}



//Llamados a la API

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day'); //El 3 es la versión actual de dbmovies.
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML= "";

    createMovies(movies, trendingMoviesPreviewList);
}


async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    }); //Verificamos en la documentacion cual es el endpoint que debemos consumir
    const movies = data.results;
    
    createMovies(movies, genericSection);
}


async function getCategoriesPreview() {  //La lista horizontal con colores de las categorias
    const { data } = await api('genre/movie/list');  //traigo la API
    const categories = data.genres;
    
    createCategories(categories, categoriesPreviewList);

    //categoriesPreviewList
}


async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query, //Como el parametro es igual a lo que le queremos enviar, poner solo el nombre es suficiente-
        },
    }); //Verificamos en la documentacion cual es el endpoint que debemos consumir
    const movies = data.results;
    
    createMovies(movies, genericSection);

    headerCategoryTitle.innerHTML = 'Results for: ' + query;
}


async function getTrendingMovies() {
    const { data } = await api('trending/movie/day'); //El 3 es la versión actual de dbmovies.
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML= "";

    createMovies(movies, genericSection);
}


async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id); //El 3 es la versión actual de dbmovies.

    const movieImgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id);
}



async function getRelatedMoviesById(id) {
    const { data } = await api (`movie/${id}/recommendations`);   //Axios (pedido a la API)
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);    
}



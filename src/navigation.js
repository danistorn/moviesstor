searchFormBtn.addEventListener('click', () => {    
    location.hash = '#search=' + searchFormInput.value; //el valor que escribieron los usaurios en el input de busqueda
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

arrowBtn.addEventListener('click', () => {
    history.back();
    //location.hash = window.history.back();
});


headerTitle.addEventListener('click', () => {
    location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


//Función de los IF/ELSE. Funcion NAVIGATOR
function navigator() {      
    console.log({location});
    
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else  {
        homePage();
    }
    

    //window.scrollTo(0,0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//FUNCION de cada uno de los sectores:
function homePage() {
    console.log('Home!!');   

    
    headerSection.classList.remove ('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive'); //la flecha no aparecerá en esta sección. La clase inactive le pone display none (en el css) 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive'); 
    headerCategoryTitle.classList.add('inactive'); //Si no estoy en la vista de categorias (aca estoy en la vista principal) no quiero que lo muestre.
    searchForm.classList.remove('inactive');

    //Sección Preview de las Tendencias
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesPreview();
    getTrendingMoviesPreview();
}


function categoriesPage() {
    console.log('categoriesPage');   


    headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white'); 
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive'); //Si no estoy en la vista de categorias (aca estoy en la vista principal) no quiero que lo muestre.
    searchForm.classList.add('inactive');   //searchForm = cajita input. Lupita para buscar una peli en particular

    //Sección Preview de las Tendencias
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');



    // ['#category'], ['id-name]
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}


function movieDetailsPage() {
    console.log('movieDetailsPage. Movie!!!');   


    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white'); 
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.add('inactive'); //Si no estoy en la vista de categorias (aca estoy en la vista principal) no quiero que lo muestre.
    searchForm.classList.add('inactive');

    //Sección Preview de las Tendencias
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    // ['#movie'], ['elId']
    const [_, movieId] = location.hash.split('='); //para sacar info de la URL
    getMovieById(movieId);
}


function searchPage() {
    console.log('searchPage');   

    headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white'); 
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive'); //Si no estoy en la vista de categorias (aca estoy en la vista principal) no quiero que lo muestre. O lo dejo apra que me indique lo que acabo de buscar.
    searchForm.classList.remove('inactive');

    //Sección Preview de las Tendencias
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search'], ['loQueHayanBuscado']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}


function trendsPage() {
    console.log('trendsPage');   

    headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.remove('inactive'); //En vez de sacarlo, lo cambio por otra cosa alla abajo.
    searchForm.classList.add('inactive');

    //Sección Preview de las Tendencias
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMovies();

    headerCategoryTitle.innerHTML = 'Tendencias';

}


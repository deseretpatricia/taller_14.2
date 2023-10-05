const apiUrl =  'https://japceibal.github.io/japflix_api/movies-data.json'
const lista = document.getElementById('lista')
const btnBuscar = document.getElementById('btnBuscar')
const userSearch = document.getElementById('inputBuscar')
let miListadoDeDatos

fetch(apiUrl)    
    .then (response =>{
        if (response.status ==200){
            return response.json();
        }else{
            throw new  error ('error al obtener datos de la api' + response.status);
        }      
    })
    .then (data =>{
        miListadoDeDatos = data;
    })
    .catch(error =>{
        console.log('error', error);
    });
    
function showMoreInfo (movie){
    console.log(movie)
}

function addMovies (moviesList){
    lista.innerHTML = '';
    for(let movie of moviesList){
        let element = document.createElement('li')
        let commentSection = document.createElement('section')
        commentSection.classList = 'comment-section'
        let countStar = movie.vote_average / 2
        for(let i = 0; i < 5; i++){
            let star = document.createElement('span')
            if(countStar > 0){
                star.classList = 'fa fa-star checked'
                countStar --
            }else{
                star.classList = 'fa fa-star'
            }
            commentSection.appendChild(star)
        }
        element.innerHTML = `<section class='name-description'>
            <h3>${movie.title}</h3> 
            <em>${movie.overview}</em>
        </section>`
        element.appendChild(commentSection)
        
        element.onclick = () => {showMoreInfo(movie); console.log(movie)}
        lista.appendChild(element)
    }
}
function searchMovies (){  
    const resultados = miListadoDeDatos.filter(pelicula => 
        pelicula.title.toLowerCase().includes(userSearch.value.toLowerCase())||
        pelicula.tagline.toLowerCase().includes(userSearch.value.toLowerCase())||
        pelicula.overview.toLowerCase().includes(userSearch.value.toLowerCase())
        );
    addMovies(resultados)
}
 btnBuscar.addEventListener('click', searchMovies);
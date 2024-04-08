let url = 'https://api.npoint.io/f8d1be198a18712d3f29/films/'
const listHolder = document.getElementById('films')
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(url)
})

//Create fetch function
function fetchMovies(url){
    fetch(url)
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie)
        });
    })
}

function displayMovie(movie){
   
    const li = document.createElement('li')
    li.style.cursor="pointer"
    li.textContent= (movie.title).toUpperCase()
    listHolder.appendChild(li)
    addClickEvent()
}
function addClickEvent(){
    let children=listHolder.children
    // console.log(children)

    for(let i=0; i<children.length; i++){
        let child=children[i]
        // console.log(child)

        child.addEventListener('click',() => {
            fetch(`${url}/${i+0}`)

            .then(res => res.json())
            .then(movie => {
                document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                setUpMovieDetails(movie)
            })

        })
    }
}
function setUpMovieDetails(childMovie){
    const preview = document.getElementById('poster')
    preview.src = childMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = childMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${childMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = childMovie.description;
    const showTime = document.querySelector('#showtime')
    showTime.textContent = childMovie.showtime;
    const tickets  = document.querySelector('#ticket-num')
    tickets.textContent = childMovie.capacity -childMovie.tickets_sold;
}
const btn = document.getElementById('buy-ticket')

        btn.addEventListener('click', function(e){
            let remTickets = document.querySelector('#ticket-num').textContent
            e.preventDefault()
            if(remTickets > 0){
                document.querySelector('#ticket-num').textContent  = remTickets-1
                
            }
            else if(parseInt(remTickets, 10)===0){
                btn.textContent = 'Sold Out'
            }
    })
import { showView } from "./router.js";

const section = document.querySelector('#home-page');
let catalog = section.querySelector('#movie card-deck d-flex justify-content-center');

export function homePage() {
    showView(section);
}

function createMoviePreview(movie){

}

async function getMovies(){
    let res = await fetch('http://localhost:3030/data/movies');
    let data = await res.json();
    return data;
}
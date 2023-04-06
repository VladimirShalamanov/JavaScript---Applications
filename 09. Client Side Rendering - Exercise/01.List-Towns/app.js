import { html, render } from './node_modules/lit-html/lit-html.js';

let form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
let root = document.getElementById('root');

function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let { towns } = Object.fromEntries(formData);
    let townsArr = towns.split(', ');
    renderMethod(townsArr);
    form.reset();
}

function renderMethod(data) {
    let res = createTown(data);
    render(res, root);
}

function createTown(town) {
    const ul = html`
    <ul>
        ${town.map(x => html`<li>${x}</li>`)}
    </ul>
    `;
    return ul;
}
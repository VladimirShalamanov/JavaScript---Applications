import { html, render } from './node_modules/lit-html/lit-html.js';
let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

let root = document.getElementById('menu');
let form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
onload();

function onSubmit(e) {
    e.preventDefault();
    let value = document.getElementById('itemText').value;
    value && addItem(value);
}
async function addItem(data) {
let response = await fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'Application/json'
    },
    body: JSON.stringify({text: data})
});
form.reset();
onload();
}

async function onload() {
    let response = await fetch(url);
    let data = await response.json();
    let res = Object.values(data).map(x => createTemp(x));
    render(res, root);
}
function createTemp(x) {
    return html`
    <option value=${x._id}>${x.text}</option>
    `;
}


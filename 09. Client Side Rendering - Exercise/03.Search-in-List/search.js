import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let root = document.getElementById('towns')
let result = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);
update();

function search() {
   let el = document.getElementById('searchText');
   let text = el.value.toLocaleLowerCase();
   update(text);
   updateCount();
   el.value = '';
}

function update(text) {
   let ul = template(towns, text);
   render(ul, root);
}

function template(town, match) {
   return html`
   <ul>
     ${town.map(x => createTemp(x, match))}
   </ul>
     `;
}

function createTemp(town, match) {
   return html`
   <li class="${(match && town.toLocaleLowerCase().includes(match)) ? 'active' : ''}">${town}</li>
   `;
}
function updateCount() {
   let count = document.querySelectorAll('.active').length;
   let el = html`<p>${count} matches found</p>`;
   render(el, result);
}
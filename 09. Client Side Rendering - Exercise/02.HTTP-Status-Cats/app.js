import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

let root = document.getElementById('allCats');

let template = html`
<ul>
   ${cats.map(c => createCat(c))}
</ul>
`;

render(template, root);

function createCat(cat) {
    return html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click="${shwContent}" class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`;
}

function shwContent(e) {
    let conteiner = e.target.parentElement.children[1];

    if (conteiner.style.display == 'none') {
        conteiner.style.display = 'block';
        e.target.textContent = 'Hide status code'
    }
    else {
        conteiner.style.display = 'none';
        e.target.textContent = 'Show status code';
    }
}

import { getAllIdea } from '../api/data.js';

let dashboardHolder = document.getElementById('dashboard-holder');

dashboardHolder.addEventListener('click', onDetails);
let ctx = null;

function onDetails(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        let id = e.target.dataset.id;
        ctx.goTo('/details', id);
    }
}
export async function showCatalog(context) {
    ctx = context;
    context.showSection(dashboardHolder);

    let ideas = await getAllIdea();

    if (ideas.length === 0) {
        dashboardHolder.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    }
    else {
        dashboardHolder.removeChildren(...ideas.map(createIdea));
    }
}
function createIdea(idea) {
    let div = document.createElement('div');
    div.classList = 'card overflow-hidden current-card details';
    div.style.width = '20rem';
    div.style.height = '18rem';

    div.innerHTML = `
                 <div class="card-body">
                    <p class="card-text">${idea.title}</p>
                </div>
                <img class="card-image" src=${idea.img} alt="Card image cap">
                <a data-id=${idea._id} class="btn" href="">Details</a>
                `;
    return div;
}
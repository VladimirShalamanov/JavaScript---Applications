import { getIdeaById, deleteById, createIdea } from '../api/data.js';

let detailsView = document.getElementById('detailsView');

export async function showDetails(context, id) {
    let idea = await getIdeaById(id);
    context.showSection(detailsView);
    let userData = JSON.parse(sessionStorage.getItem('user'));
    let isOwner = userData && userData._id === idea._owner.id;
    detailsView.innerHTML = createIdea(idea, isOwner);

    if (isOwner) {
        detailsView.querySelector('a').addEventListener('click', async (e) => {
            e.preventDefault();
            deleteById(id);
            context.goTo('/catalog');
        });
    }
}
function createIdea(idea, isOwner) {
    let html = `
    <img class="det-img" src=${idea.img} />
            <div class="desc">
                <h2 class="display-5">${idea.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${idea.description}</p>
            </div>
    `;

    if (isOwner) {
        html += `<div class="text-center">
              <a class="btn detb" href="">Delete</a>
              </div>`;
    }
    return html;
}
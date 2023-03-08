import { showDetails } from './details.js';

const section = document.getElementById("homeView");
section.querySelector('div.topic-title').addEventListener('click', showDetails);
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);
section.querySelector('[name="cancel"]').addEventListener('click', clearForm);
const conteiner = section.querySelector('div.topic-container');

section.remove();

const url = "http://localhost:3030/jsonstore/collections/myboard/posts";

export async function showHome(ev) {
    ev?.preventDefault();
    document.getElementById('main').replaceChildren('Loading...');

    const res = await fetch(url);
    const posts = await res.json();

    conteiner.replaceChildren(...Object.values(posts).map(createPostPreview));

    document.getElementById('main').replaceChildren(section);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const topicName = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const postText = formData.get('postText').trim();

    try {
        if (!topicName || !username || !postText) {
            throw new Error('All fields are required!');
        }

        const body = { topicName, username, postText, date: new Date() }; // NEW DATE
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        clearForm();
        showHome();
    } catch (error) {
        alert(error.message)
    }
}

function clearForm() {
    form.reset()
}

function createPostPreview(post) {
    const el = document.createElement('div');
    el.className = "topic-name-wrapper";
    el.innerHTML = `
            <div class="topic-name">
                <a href="/details" class="normal" id="${post._id}">
                      <h2>${post.topicName}</h2>
                </a>
                <div class="columns">
                     <div>
                         <p>Date: <time>${post.date}</time></p>
                         <div class="nick-name">
                             <p>Username: <span>${post.username}</span></p>
                         </div>
                     </div>
                </div>
           </div>`;

    return el;
}


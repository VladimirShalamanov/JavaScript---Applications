const section = document.getElementById("detailsView");
const postElements = {
    title: document.getElementById('details-title'),
    username: document.getElementById('details-username'),
    time: document.getElementById('details-time'),
    content: document.getElementById('details-content'),
};
const commentsList = document.getElementById('user-comment');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();

export function showDetails(ev) {
    let target = ev.target;
    if (target.tagName == "H2") {
        target = target.parentElement;
    }
    if (target.tagName == "A") {
        ev.preventDefault();

        const postId = target.id;
        showPost(postId);
    }
}

async function showPost(postId) {
    document.getElementById('main').replaceChildren('Loading...');

    const [res, commentsRes] = await Promise.all([
        fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`),
        fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`)
    ]);
    const [post, comments] = await Promise.all([
        res.json(),
        commentsRes.json()
    ]);

    commentsList.replaceChildren(...Object
        .values(comments)
        .filter(c => c.postId == postId)
        .map(createCommentElement));

    form.id = postId;
    postElements.title.textContent = post.topicName;
    postElements.username.textContent = post.username;
    postElements.time.textContent = post.date;
    postElements.content.textContent = post.postText;

    document.getElementById('main').replaceChildren(section);
}

function createCommentElement(comment) {
    const el = document.createElement('div');
    el.className = 'topic-name-wrapper';
    el.innerHTML = `
                  <div class="topic-name">
                       <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
                        <div class="post-content">
                           <p>${comment.content}</p>
                        </div>
                   </div>`;
    return el;
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);

    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const postId = form.id;
    try {
        if (!username || !content) {
            throw new Error('All fields are required!');
        }

        const body = { username, content, postId, date: new Date() };
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }
        clearForm();
        showPost(postId);
    }
    catch (error) {
        alert(error.message);
    }
}

function clearForm() {
    form.reset()
}
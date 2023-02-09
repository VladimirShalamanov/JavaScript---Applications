function attachEvents() {
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let posts = document.getElementById('posts');
    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');

    let btnViewPost = document.getElementById('btnViewPost');

    btnLoadPosts.addEventListener('click', async function () {
        let response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let data = await response.json();

        Object.values(data).forEach(x => posts.appendChild(template(x)));
    });

    btnViewPost.addEventListener('click', async function () {
        let urlComments = `http://localhost:3030/jsonstore/blog/comments`;
        let response = await fetch(urlComments);
        let data = await response.json();
        let obj = Object.values(data).find(x => x.postId == posts.value);
        view(obj);
    });
}
function template({ body, id, title }) {
    let op = document.createElement('option');
    op.value = id;
    op.textContent = title;
    return op;
}
async function view({ id, postId, text }) {
    let response = await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`);
    let data = await response.json();

    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');

    //postTitle.textContent = '';
    postTitle.textContent = data.title;
    //postBody.textContent = '';
    postBody.textContent = data.body;

    let li = document.createElement('li');
    li.id = id;
    li.textContent = text;
    postComments.appendChild(li);
}

// attachEvents();
//=============
// function attachEvents() {
//     const posts = document.getElementById('posts');

//     document.getElementById('btnLoadPosts').addEventListener('click', async () => {
//         const url = `http://localhost:3030/jsonstore/blog/posts`;

//         const response = await fetch(url);
//         const data = await response.json();

//         Object.values(data).forEach(p => {
//             const option = template(p.id, p.title);
//             posts.appendChild(option);
//         })
//     });

//     document.getElementById('btnViewPost').addEventListener('click', async () => {
//         const id = posts.value;
//         const post = await getPostInfo(id);

//         document.getElementById('post-title').textContent = post.title;
//         document.getElementById('post-body').textContent = post.body;

//         const url = `http://localhost:3030/jsonstore/blog/comments`;
//         const response = await fetch(url);
//         const data = await response.json();

//         const comments = Object.values(data).filter(x => x.postId == id);
//         const postComments = document.getElementById('post-comments');
//         postComments.innerHTML = '';

//         comments.forEach(c => {
//             const comment = createLi(c.id, c.text);
//             postComments.appendChild(comment);
//         });
//     });
//     async function getPostInfo(id) {
//         const url = `http://localhost:3030/jsonstore/blog/posts/${id}`;
//         const response = await fetch(url);
//         const data = await response.json();
//         return data;
//     }
//     function template(id, title ) {
//         let op = document.createElement('option');
//         op.value = id;
//         op.textContent = title;
//         return op;
//     }
//     function createLi(id, text){
//         let li = document.createElement('li');
//         li.id = id;
//         li.textContent = text;
//         return li;
//     }
// }

// attachEvents();

//'''''''''''''''''''
// function attachEvents() {
//     const posts = document.getElementById('posts');

//     document.getElementById('btnLoadPosts').addEventListener('click', async () => {
//         const url = `http://localhost:3030/jsonstore/blog/posts`;

//         const response = await fetch(url);
//         const data = await response.json();

//         Object.values(data).forEach(p => {
//             const option = createElement('option', p.title, ['value', p.id]);
//             posts.appendChild(option);
//         })
//     });

//     document.getElementById('btnViewPost').addEventListener('click', async () => {
//         const id = posts.value;

//         const post = await getPostInfo(id);

//         document.getElementById('post-title').textContent = post.title;
//         document.getElementById('post-body').textContent = post.body;

//         const url = `http://localhost:3030/jsonstore/blog/comments`;

//         const response = await fetch(url);
//         const data = await response.json();

//         const comments = Object.values(data).filter(x => x.postId == id);

//         const postComments = document.getElementById('post-comments');

//         postComments.innerHTML = '';

//         comments.forEach(c => {
//             const comment = createElement('li', c.text, ['id', c.id]);
//             postComments.appendChild(comment);
//         });
//     });

//     async function getPostInfo(id) {
//         const url = `http://localhost:3030/jsonstore/blog/posts/${id}`;

//         const response = await fetch(url);
//         const data = await response.json();

//         return data;
//     }

//     function createElement(type, content, attributes = []) {
//         const element = document.createElement(type);

//         if (content) {
//             element.textContent = content;
//         }

//         if (attributes.length > 0) {
//             element.setAttribute(attributes[0], attributes[1]);
//         }

//         return element;
//     }
// }

// attachEvents();
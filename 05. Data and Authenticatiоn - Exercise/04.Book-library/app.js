document.getElementById('loadBooks').addEventListener('click', loadBooks);
document.querySelector('form').addEventListener('submit', createBook);
let table = document.querySelector('table').addEventListener('click', editOrDel);

let bookId = '';

async function loadBooks() {
    let response = await fetch('http://localhost:3030/jsonstore/collections/books');

    if (response.ok != true) {
        alert(response.message);
        throw new Error(response.message);
    }
    let data = await response.json();
    let rows = Object.entries(data).map(createElements).join('');
    document.querySelector('tbody').innerHTML = rows;
}
function createElements([id, book]) {
    let row =
        `<tr id='${id}'>
         <td>${book.title}</td>
         <td>${book.author}</td>
            <td>
             <button>Edit</button>
             <button>Delete</button>
             </td>
        </tr>`;
    return row;
}

async function createBook(e) {
    e.preventDefault();
    let f = document.querySelector('form').children[0].textContent;
    if (f == 'FORM') {
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let author = formData.get('author');

        if (title && author) {
            let book = { title: title, author: author };
            e.target.reset();

            let response = await fetch('http://localhost:3030/jsonstore/collections/books', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });
            await response.json();
            await loadBooks();
        }
    }
    else {
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let author = formData.get('author');

        if (title && author) {
            if (bookId) {
                let book = { title: title, author: author };

                let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${bookId}`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book)
                });
                await response.json();
            }
            else {
                document.querySelector('form').children[0].textContent = title;
                document.querySelector('form').children[0].textContent = author;
            }
            e.target.reset();
            document.querySelector('form').children[0].textContent = 'FORM';
            document.querySelector('form').children[5].textContent = 'Submit';
            await loadBooks();
        }
    }

}

function editOrDel(e) {
    if (e.target.textContent == 'Edit') {
        setEditBook(e.target.parentElement.parentElement.id,
            e.target.parentElement.parentElement);
    }
    else if (e.target.textContent == 'Delete') {
        deleteBook(e.target.parentElement.parentElement.id,
            e.target.parentElement.parentElement);
    }
}
async function deleteBook(id, el) {
    if (id) {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'delete'
        });
        await response.json();
        await loadBooks();
    }
    else {
        el.remove();
    }

}
async function setEditBook(id, el) {
    document.querySelector('form').children[0].textContent = 'Edit FORM';
    document.querySelector('form').children[5].textContent = 'Save';
    if (id) {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`);
        let data = await response.json();
        bookId = id;
        document.querySelector('form').children[2].value = data.title;
        document.querySelector('form').children[4].value = data.author;
    }
    else {
        document.querySelector('form').children[2].value = el.children[0].textContent;
        document.querySelector('form').children[4].value = el.children[1].textContent;
    }
}
// async function update() {
//     e.preventDefault();
//     let formData = new FormData(e.target);
//     let id = formData.get('id');
//     let title = formData.get('title');
//     let author = formData.get('author');

//     if (title && author) {
//         let book = { title: title, author: author };
//         e.target.reset();

//         let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
//             method: 'put',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(book)
//         });
//         await response.json();
//         document.querySelector('form').children[0].textContent = 'FORM';
//         document.querySelector('form').children[5].textContent = 'Submit';
//         await loadBooks();
//     }
// }
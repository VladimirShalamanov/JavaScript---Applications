function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';

    let btnLoad = document.getElementById('btnLoad').addEventListener('click', load);
    let btnCreate = document.getElementById('btnCreate').addEventListener('click', create);

    async function load() {
        let response = await fetch(url);
        let data = await response.json();

        let list = document.getElementById('phonebook');
        list.innerHTML = '';
        Object.values(data).forEach(x => list.appendChild(createLi(x)));
    }
    async function create() {
        let person = document.getElementById('person');
        let phone = document.getElementById('phone');

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person: person.value, phone: phone.value })
        });

        await response.json();
        load();
        person.value = '';
        phone.value = '';
        return;s
    }

    function createLi({ person, phone, _id }) {
        let li = document.createElement('li');
        li.id = _id;
        li.innerHTML = `${person}: ${phone}`;
        let btnDel = document.createElement('button');
        btnDel.innerHTML = 'Delete';
        btnDel.addEventListener('click', deleteP);

        li.appendChild(btnDel);
        return li;
    }
    async function deleteP(e) {
        let response = await fetch(`${url}/${e.target.parentNode.id}`, { method: 'delete' });
        e.target.parentNode.remove();
    }
}

attachEvents();
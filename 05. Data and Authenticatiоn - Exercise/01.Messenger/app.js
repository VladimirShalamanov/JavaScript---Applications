function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/messenger';

    document.getElementById('submit').addEventListener('click', sub);
    document.getElementById('refresh').addEventListener('click', refresh);

    async function sub() {
        let arr = document.querySelectorAll("input[type=text]")
        let data = { author: arr[0].value, content: arr[1].value };

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json()' },
            body: JSON.stringify(data)
        });
        arr[0].value = '';
        arr[1].value = '';
        return response;
    }
    async function refresh() {
        let data = await fetch(url);
        let response = await data.json();
        let mess = document.getElementById('messages');
        mess.innerHTML = Object.values(response).map(x => `${x.author}: ${x.content}`).join('\n');
    }
}

attachEvents();
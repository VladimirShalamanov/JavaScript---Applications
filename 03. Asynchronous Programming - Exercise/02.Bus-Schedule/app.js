function solve() {
    let url = `http://localhost:3030/jsonstore/bus/schedule/`;
    let currStop = 'depot';
    let nextStop = 'depot';

    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let res = document.getElementsByClassName('info')[0];


    async function depart() {
        let fullUrl = url + currStop;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        
        await fetch(fullUrl)
            .then((res) => res.json())
            .then((data) => {
                res.textContent = `Next stop ${data.name}`;
                nextStop = data.next;
            })
            .catch(function () {
                res.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    async function arrive() {
        let fullUrl = url + currStop;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        await fetch(fullUrl)
            .then((res) => res.json())
            .then((data) => {
                res.textContent = `Arriving at ${data.name}`;
                currStop = nextStop;
            })
            .catch(function () {
                res.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

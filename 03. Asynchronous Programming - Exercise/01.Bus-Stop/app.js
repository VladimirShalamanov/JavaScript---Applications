async function getInfo() {
    let stopid = document.getElementById('stopId');
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopid.value}`;

    let stopName = document.getElementById('stopName');
    let buses = document.getElementById('buses');
    await fetch(url)
        .then((res) => res.json())
        .then((data) => {
            stopName.textContent = data.name;
            for (const bus of Object.keys(data.buses)) {d
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
                buses.appendChild(li);
            }
        })
        .catch(stopName.textContent = 'Error');

    stopid.value = '';
}
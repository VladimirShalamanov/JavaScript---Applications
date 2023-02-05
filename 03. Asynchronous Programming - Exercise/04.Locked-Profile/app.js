async function lockedProfile() {
    const main = document.getElementById('main');

    main.innerHTML = '';
    let url = "http://localhost:3030/jsonstore/advanced/profiles";
    let response = await fetch(url);
    let data = await response.json();
    let i = 0;

    Object.entries(data).forEach(x => {
        i++;
        let divProfile = document.createElement('div');
        divProfile.classList.add('profile');

        let img = document.createElement('img');
        img.src = "./iconProfile2.png";
        img.classList.add('userIcon');

        let labelLock = document.createElement('label');
        labelLock.textContent = 'Lock';
        let input1 = document.createElement('input');
        input1.type = 'radio';
        input1.name = `user${i}Locked`;
        input1.value = 'lock';
        input1.checked = true;

        let labelUnlock = document.createElement('label');
        labelUnlock.textContent = 'Unlock';
        let input2 = document.createElement('input');
        input2.type = 'radio';
        input2.name = `user${i}Locked`;
        input2.value = 'unlock';

        let br = document.createElement('br');
        let hr1 = document.createElement('hr');

        let labelUsername = document.createElement('label');
        labelLock.textContent = 'Username';

        let inputUsername = document.createElement('input');
        inputUsername.type = 'text';
        inputUsername.name = `user${i}Username`;
        inputUsername.value = x[1].username;
        inputUsername.disabled = '';
        inputUsername.readonly = '';

        let divId = document.createElement('div');
        divId.id = `user${i}HiddenFields`;
        //------
        let hr2 = document.createElement('hr');
        let labelEmail = document.createElement('label');
        labelEmail.textContent = 'Email:';

        let inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.name = `user${i}Email`;
        inputEmail.value = x[1].email;
        inputEmail.disabled = '';
        inputEmail.readonly = '';

        let labelAge = document.createElement('label');
        labelAge.textContent = 'Age:';

        let inputAge = document.createElement('input');
        inputAge.type = 'email';
        inputAge.name = `user${i}Age`;
        inputAge.setAttribute('value', x[1].age);
        inputAge.disabled = '';
        inputAge.readonly = '';

        let btn = document.createElement('button');
        btn.textContent = 'Show more';
        btn.addEventListener('click', show);

        divId.appendChild(hr2);
        divId.appendChild(labelEmail);
        divId.appendChild(inputEmail);
        divId.appendChild(labelAge);
        divId.appendChild(inputAge);

        divProfile.appendChild(img);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(input1);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(input2);
        divProfile.appendChild(br);
        divProfile.appendChild(hr1);
        divProfile.appendChild(labelUsername);
        divProfile.appendChild(inputUsername);
        divProfile.appendChild(divId);
        divProfile.appendChild(btn);
        main.appendChild(divProfile);
    })

    function show(e) {
        if (e.target.parentNode.children[4].checked &&
            e.target.textContent === 'Show more') {
            e.target.parentNode.children[9].style.display = 'inline';
            e.target.textContent = 'Hide it';
            return;
        }
        e.target.parentNode.children[9].style.display = 'none';
        e.target.textContent = 'Show more';
    }
}
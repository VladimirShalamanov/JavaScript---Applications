export function initialize(links) {
    let main = document.getElementById('mainView');
    document.querySelector('nav').addEventListener('click', onNavigate);

    let context = {
        showSection,
        goTo,
        updateNavigate
    }
    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            let url = new URL(target.href);
            goTo(url.pathname);
        }
    }
    function goTo(name, ...params) {
        let handler = links[name];
        if (typeof (handler) === 'function') {
            handler(context, ...params);
        }
    }
    function updateNavigate() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            document.querySelector('.user').forEach(e => e.style.display = 'block');
            document.querySelector('.guest').forEach(e => e.style.display = 'none');
        }
        else {
            document.querySelector('.user').forEach(e => e.style.display = 'none');
            document.querySelector('.guest').forEach(e => e.style.display = 'block');
        }
    }
}
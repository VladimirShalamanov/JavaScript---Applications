import { login } from '../../user.js';

let loginView = document.getElementById('loginView');

let form = loginView.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;
export function showLogin(context) {
    ctx = context;
    context.showSection(loginView);
}
async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);

    let { email, password } = Object.fromEntries(formData);
    await login(email, password);
    ctx.updateNavigate();
    ctx.goTo('/catalog');
}
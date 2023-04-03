import { register } from "../api/user.js";

let registerView = document.getElementById('registerView');

let form = registerView.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;
export function showRegister(context) {
    ctx = context;
    context.showSection(registerView);
}
async function onSubmit(e) {
    e.preventDefault();
    debugger
    let formData = new FormData(form);

    let { email, password, repeatPassword } = Object.fromEntries(formData);
    if (password !== repeatPassword) {
        alert('password dos not match')
    }
    else {
        await register(email, password);
        ctx.updateNavigate();
        ctx.goTo('/catalog');
    }
}
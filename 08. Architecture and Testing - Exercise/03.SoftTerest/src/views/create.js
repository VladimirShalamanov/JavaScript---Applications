import { createIdea } from "../api/data.js";

let createView = document.getElementById('createView');
let form = createView.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;
export function showCreate(context) {
    ctx = context;
    context.showSection(createView);
}
async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let { title, description, imageURL } = Object.fromEntries(formData);

    await createIdea({ title, description, img: imageURL });
    form.reset();
    ctx.goTo('/catalog');
}
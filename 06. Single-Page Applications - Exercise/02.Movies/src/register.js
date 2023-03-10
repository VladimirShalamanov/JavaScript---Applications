import { showView } from "./router.js";

const section = document.querySelector('#form-sign-up');

export function registerPage() {
    showView(section);
}
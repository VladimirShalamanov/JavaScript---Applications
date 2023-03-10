import { showView } from "./router.js";

const section = document.querySelector('#form-login');

export function loginPage() {
    showView(section);
}
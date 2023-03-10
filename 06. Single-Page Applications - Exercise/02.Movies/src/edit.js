import { showView } from "./router.js";

const section = document.querySelector('#edit-movie');

export function editPage() {
    showView(section);
}
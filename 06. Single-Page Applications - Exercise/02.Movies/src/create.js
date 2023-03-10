import { showView } from "./router.js";

const section = document.querySelector('#add-movie');

export function createPage() {
    showView(section);
}
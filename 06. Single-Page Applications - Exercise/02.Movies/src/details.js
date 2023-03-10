import { showView } from "./router.js";

const section = document.querySelector('#movie-example');

export function detailsPage() {
    showView(section);
}


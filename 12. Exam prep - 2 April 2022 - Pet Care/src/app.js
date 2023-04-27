import { html, render, page } from './lib.js';
import { registerShow } from './views/register.js';
import { catalogShow } from './views/catalog.js';
import { homeShow } from './views/home.js';
import { loginShow } from './views/login.js';
import { updateNav } from './views/nav.js';
import { getUserData } from './util.js';
import { detailsShow } from './views/details.js';
import { createShow } from './views/create.js';
import { editShow } from './views/edit.js';

let main = document.getElementById('content');

// document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);

page('/', homeShow);
page('/catalog', catalogShow);
page('/catalog/:id', detailsShow);
page('/edit/:id', editShow);
page('/create', createShow);

page('/login', loginShow);
page('/register', registerShow);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    let user = getUserData();
    if (user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}
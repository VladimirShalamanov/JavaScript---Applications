import { html, render, page } from './lib.js';
import { registerShow } from './views/register.js';
import { catalogShow } from './views/catalog.js';
import { homeShow } from './views/home.js';
import { loginShow } from './views/login.js';
import { getUserData } from './util.js';
import { detailsShow } from './views/details.js';
import { createShow } from './views/create.js';
import { editShow } from './views/edit.js';
import { updateNav } from './views/nav.js';

// Get element !!!
let main = document.querySelector('main');

page(decorateContext);

// page('/', () => console.log('home'));
// page('/login', () => console.log('login'));
// page('/register', () => console.log('register'));
// page('/catalog', () => console.log('catalog'));
// page('/create', () => console.log('create'));
// page('/details/:id', () => console.log('details'));
// page('/edit/:id', () => console.log('edit'));

page('/', homeShow);
page('/login', loginShow);
page('/register', registerShow);
page('/catalog', catalogShow);
page('/create', createShow); 
page('/details/:id', detailsShow);   
page('/edit/:id', editShow);

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
import { initialize } from './src/router.js';
import { showCatalog } from './src/views/catalog.js';
import { showCreate } from './src/views/create.js';
import { showDetails } from './src/views/details.js';
import { showHome } from './src/views/home';
import { showLogin } from './src/views/login';
import { showRegister } from './src/views/register';
import { logout } from './user.js';

document.getElementById('defSection').remove();

let links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': async function () {
        await logout();
        router.goTo('/');
        router.updateNavigate();
    }
}

let router = initialize(links);
router.updateNavigate();
router.goTo('/');
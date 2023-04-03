import * as api from './api.js';

export async function login(email, password) {
    let user = await api.post('users/login', { email, password });
    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    let user = await api.post('users/register', { email, password });
    sessionStorage.setItem('user', JSON.stringify(user));
}
export async function logout(email, password) {
    api.get('users/register');
    sessionStorage.removeItem('user');
}
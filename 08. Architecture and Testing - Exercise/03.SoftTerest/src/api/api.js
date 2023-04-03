let host = 'http://localhost:3030/';

async function requester(method, url, data) {
    let user = sessionStorage.getItem('user');
    let option = {
        method,
        headers: {}
    };

    if (data) {
        option.headers['Content-Type'] = 'Application/json()';
        option.body = JSON.stringify(data);
    }
    if (user) {
        let token = user.accesssToken;
        option.headers['X-Authorization'] = token;
    }
    try {
        let response = await fetch(host + url, option);
        if (!response.ok) {
            if (response.status === 403) {
                sessionStorage.removeItem('user');
            }
            let err = await response.json();
            throw new Error(err.message);
        }
        if (response.status === 204) {
            return response;
        }
        else {
            return response.json();
        }
    }
    catch (err) {
        alert(err);
        throw err;
    }
}

const get = requester.bind(null, 'get');
const post = requester.bind(null, 'post');
const put = requester.bind(null, 'put');
const del = requester.bind(null, 'del');

export {
    get,
    post,
    put,
    del as delete
}

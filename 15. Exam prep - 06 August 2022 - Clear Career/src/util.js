export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}
export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}
export function clearUserData() {
    sessionStorage.removeItem('userData');
}

// Other options
export function createSubmit(callBack) {
    return function (e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let data = Object.fromEntries(formData);

        callBack(data, e.target);
    }
}
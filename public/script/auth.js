const currentUserState = JSON.parse(localStorage.getItem('user'));

function checkUserState() {
    if (currentUserState) {
        console.log(true);
        return;
    } else {
        console.log(false);
        return;
    }
}

window.addEventListener('load', checkUserState);

document.getElementById("logout").addEventListener("click", async function(e) {
    window.localStorage.removeItem('user');

    return window.location.href = 'http://localhost:3000/auth/login';
})

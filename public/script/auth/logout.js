document.getElementById("logout").addEventListener("click", function() {
    window.localStorage.removeItem('user');
    return window.location.href = 'http://localhost:3000/auth/login';
})

document.getElementById("logout").addEventListener("submit", function(e) {
    e.preventDefault();

    const url = 'http://localhost:3000/auth/logout';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    }

    fetch(url, options)
        .then(async response => {
            try {
                const data = await response.json();
                alert('Response data?', data);
            } catch (error) {
                alert('Error happened here!');
                alert(error);
            }
        });

    location.href = 'http://localhost:3000/auth/login';
    return;
})
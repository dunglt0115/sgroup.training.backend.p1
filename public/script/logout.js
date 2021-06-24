document.getElementById("logout").addEventListener("submit", async function(e) {
    e.preventDefault();

    const url = 'http://localhost:3000/auth/logout';
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    }

    fetch(url, options)
        .then(async response => {
            try {
                const data = await response.json();
                alert('Response data?');
                alert(data);
            } catch (error) {
                alert('Error happened here!');
                alert(error);
            }
        });

    window.location.href = 'http://localhost:3000/auth/login';
    return;
})

document.getElementById("register").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    const url = "http://localhost:3000/auth/create";
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'credentials': 'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        }),
    };

    fetch(url, options)
        .then(async response => {
            try {
                const data = await response.json();
                alert('Successfully registered!');
                alert(data);
            } catch (error) {
                alert('Error happened!');
                alert(error);
                return location.href = "http://localhost:3000/auth/register"
            }
        });

    location.href = "http://localhost:3000/auth/login";
    return;
})

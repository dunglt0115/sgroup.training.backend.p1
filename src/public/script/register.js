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
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        })
        .then(update => console.log(update))
        .catch(e => {
            alert(e);
            return location.href = "http://localhost:3000/auth/create";
        });

    location.href = "http://localhost:3000/auth/login";
    return;
})

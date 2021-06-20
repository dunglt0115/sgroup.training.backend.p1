document.getElementById("logout").addEventListener("submit", event => {
    event.preventDefault();

    const url = "http://localhost:3000/auth/logout";
    const deleteMethod = {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    }

    fetch(url, deleteMethod)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
    window.location.href = "http://localhost:3000/auth/login";
})

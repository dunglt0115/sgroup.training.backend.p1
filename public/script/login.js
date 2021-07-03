document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/auth/login", {
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
    })

    if (!response.ok) {
        alert('Error');
    } else {
        try {
            const result = await response.json();

            localStorage.setItem('user', JSON.stringify(result));
            
            alert("Login successfully");
            return location.href = "http://localhost:3000/";
        } catch (error) {
            alert('Error happened here');
            console.log(error);
            return location.href = "http://localhost:3000/auth/login"
        }
    }
})

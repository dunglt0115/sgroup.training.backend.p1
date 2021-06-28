const previewImg = document.getElementById('preview');

document.getElementById("image").addEventListener("change", async function() {
    const form = new FormData();
    form.append('image', this.files[0]);

    const url = 'http://localhost:3000/media/uploadone';
    const options = {
        method: 'POST',
        body: form,
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        alert('Upload failed!');
    } else {
        const {src} = await response.json();
        previewImg.src = src;
        return;
    }
});

document.getElementById("newBook").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = previewImg.src;

    const url = 'http://localhost:3000/articles/create';
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'credentials': 'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            image,
        }),
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        alert('Error!');
        return location.href = 'http://localhost:3000/articles/new';
    } else {
        return location.href = "http://localhost:3000/";
    }
});

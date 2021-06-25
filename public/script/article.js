document.getElementById("newBook").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const image = document.getElementById("image");

    const formData  = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('image', image.files[0]);

    const url = 'http://localhost:3000/articles/store';
    const options = {
        method: 'POST',
        body: formData,
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        alert('Error');
        return location.href = 'http://localhost:3000/articles/create';
    } else {
        return location.href = "http://localhost:3000/";
    }
})

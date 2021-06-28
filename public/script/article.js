const image = document.getElementById("image");
const previewImg = document.getElementById('preview');

document.getElementById("image").addEventListener("change", async function(e) {
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
    
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('image', previewImg.src);

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
});

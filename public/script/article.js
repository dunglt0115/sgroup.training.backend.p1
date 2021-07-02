const fileInput = document.getElementById('image');
const previewImg = document.getElementById('preview');
const reUploadForm = document.getElementById('reUploadForm');
const reUploadBtn = document.getElementById('reUploadBtn');
const submitBtn = document.getElementById('submitButton');

document.getElementById("image").addEventListener("change", async function() {
    submitButton.disabled = true;

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
        previewImg.style.height = '144px';
        previewImg.style.width = '100px';
        previewImg.style.display = 'block';

        fileInput.disabled = true;
        reUploadForm.style.display = 'block';
        submitButton.disabled = false;
        
        return;
    }
});

reUploadBtn.addEventListener('click', async function() {
    const form = new FormData();
    form.append('image', fileInput.files[0]);

    const url = 'http://localhost:3000/media/deleteone';
    const options = {
        method: 'POST',
        body: form,
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        alert('Error');
    } else {
        fileInput.disabled = false;
        reUploadForm.style.display = 'none';
        previewImg.src = '';
        previewImg.style.display = 'none';
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

const galleryName = document.getElementById('galleryName').value;
const filesInput = document.getElementById('images');
const uploadGalleryForm = document.getElementById('uploadGalleryForm');
const cancelUploadBtn = document.getElementById('cancelUpload');

const saveGalleryBtn = document.getElementById('saveGallery');
const deleteGalleryBtn = document.getElementById('deleteGallery');
const updateGalleryBtn = document.getElementById('updateGallery');
const galleryHandler = document.getElementById('galleryHandler');

const imageGallery = document.querySelectorAll('#gallery');

const detailPageHandler = {
    previewGallery: function() {
        
    },
    fetchUploadData: async () => {
        const form = new FormData();
        form.append('galleryName', galleryName);
        
        for (let i = 0; i < filesInput.files.length; i++) {
            form.append('images', filesInput.files[i]);
        }

        const response = await fetch('http://localhost:3000/media/uploadmany', {
            method: 'POST',
            body: form,
        });

        if (!response.ok) {
            alert('Upload failed!');
        } else {
            try {
                const responseUrls = await response.json();
                console.log(responseUrls);
                return;
            } catch (error) {
                console.log('Error:', error);
                return;
            }
        }
    },
    eventHandler: function() {
        // Prevent redirect when click on image
        imageGallery.forEach(image => {
            image.onclick = (e) => {
                e.preventDefault();
            }
        });

        // Toggle upload form
        if (document.querySelectorAll('#gallery a').length == 0) {
            updateGalleryBtn.style.display = 'none';
            saveGalleryBtn.style.display = 'none';
            galleryHandler.style.display = 'none';
        } else {
            uploadGalleryForm.style.display = 'none';
            saveGalleryBtn.style.display = 'none';
            galleryHandler.style.display = 'block';
        }

        updateGalleryBtn.onclick = () => {
            galleryHandler.style.display = 'none';
            uploadGalleryForm.style.display = 'block';
            saveGalleryBtn.style.display = 'block';
        }

        // When submit gallery
        uploadGalleryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            cancelUploadBtn.style.display = 'block';
            saveGalleryBtn.style.display = 'block';
            this.fetchData();
        })

        // When save gallery
        saveGalleryBtn.onclick = () => {
            location.reload();
        }

        // When cancel upload
        cancelUploadBtn.onclick = () => {
            uploadGalleryForm.style.display = 'none';
            saveGalleryBtn.style.display = 'none';
            galleryHandler.style.display = 'block';
        }
    },
    start: function() {
        this.eventHandler();
    }
}

detailPageHandler.start();

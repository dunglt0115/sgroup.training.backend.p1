const galleryName = document.getElementById('galleryName').value;
const filesInput = document.getElementById('images');
const uploadGalleryForm = document.getElementById('uploadGalleryForm');
const cancelUploadBtn = document.getElementById('cancelUpload');

const saveGalleryBtn = document.getElementById('saveGallery');
const deleteGalleryBtn = document.getElementById('deleteGallery');
const updateGalleryBtn = document.getElementById('updateGallery');

const imageGallery = document.querySelectorAll('#gallery');

const detailPageHandler = {
    cloudinaryUrls: [],
    previewGallery: function() {
        
    },
    fetchData: async () => {
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
                detailPageHandler.cloudinaryUrls.push(responseUrls);
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
            uploadGalleryForm.style.display = 'block';
            updateGalleryBtn.style.display = 'none';
            deleteGalleryBtn.style.display = 'none';
            saveGalleryBtn.style.display = 'none';
            cancelUploadBtn.style.display = 'none';
        } else {
            uploadGalleryForm.style.display = 'none';
            updateGalleryBtn.style.display = 'block';
            deleteGalleryBtn.style.display = 'block';
        }

        updateGalleryBtn.onclick = () => {
            updateGalleryBtn.style.display = 'none';
            deleteGalleryBtn.style.display = 'none';
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
        saveGalleryBtn.addEventListener('submit', async (e) => {
            e.preventDefault();

            const firstIndexItem = this.cloudinaryUrls[0];
            let gallery = firstIndexItem.images.map(url => url);

            const response = await fetch(`${location.href}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'credentials': 'include',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gallery
                }),
            })

            if (!response.ok) {
                alert('Error');
                return;
            } else {
                alert('Succeed');
                return;
            }
        })

        // When cancel upload
        cancelUploadBtn.onclick = () => {
            uploadGalleryForm.style.display = 'none';
        }
    },
    start: function() {
        this.eventHandler();
    }
}

detailPageHandler.start();

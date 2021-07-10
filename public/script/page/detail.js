// Upload form related
const galleryName = document.getElementById('galleryName').value;
const filesInput = document.getElementById('images');
const uploadGalleryForm = document.getElementById('uploadGalleryForm');
const cancelUploadBtn = document.getElementById('cancelUpload');
const saveGalleryBtn = document.getElementById('saveGallery');

// Preview form
const tbody = document.getElementById('preview');
const previewForm = document.getElementById('containerForm');

// Buttons
const deleteGalleryBtn = document.getElementById('deleteGallery');
const updateGalleryBtn = document.getElementById('updateGallery');
const uploadNewBtn = document.getElementById('uploadNew');
const updateCurrentBtn = document.getElementById('updateCurrent');

const detailPageHandler = {
    currentImageUrls: [],
    uploadImageUrls: [],
    getCurrentImageUrls: function() {
        document.querySelectorAll('.img-fluid').forEach(image => {
            detailPageHandler.currentImageUrls.push(image.src);
        });
    },
    previewGallery: function() {
        const htmls = this.uploadImageUrls[0].map(item => {
            return `
                <tr>
                    <td>
                        <div class="form-check" id="publicIds">
                            <input class="form-check-input" type="checkbox" name="publicIds[]" value="">
                        </div>
                    </td>
                    <td>
                        <img src="${item}" height="80px" width="120px">
                    </td>
                </tr>
            `
        });

        tbody.innerHTML = htmls.join('');
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
            const responseUrls = await response.json();
            detailPageHandler.uploadImageUrls.push(responseUrls.images);
            previewForm.style.display = 'block';
            detailPageHandler.previewGallery();
        }
    },
    eventHandler: function() {
        // Prevent redirect when click on image
        document.querySelectorAll('#gallery').forEach(image => {
            image.onclick = (e) => {
                e.preventDefault();
            }
        });

        // Toggle upload form
        if (document.querySelectorAll('#gallery a').length > 0) {
            uploadGalleryForm.style.display = 'none';
            updateGalleryBtn.style.display = 'block';
        };

        updateGalleryBtn.onclick = () => {
            updateGalleryBtn.style.display = 'none';
            uploadNewBtn.style.display = 'block';
            updateCurrentBtn.style.display = 'block';
        };

        // If user want to update current gallery
        updateCurrentBtn.onclick = () => {
            document.querySelector('.gallery-title').innerHTML = 'Update gallery';
            console.log(this.currentImageUrls);
        };
        
        // If user want to upload new gallery
        uploadNewBtn.onclick = () => {
            document.querySelector('.gallery-title').style.display = 'none';
            document.getElementById('gallery').style.display = 'none';
            uploadGalleryForm.style.display = 'block';
            uploadNewBtn.style.display = 'none';
            updateCurrentBtn.style.display = 'none';
        };

        if (filesInput.files.length == 0) {
            document.getElementById('uploadBtn').disabled = true;
        };

        uploadGalleryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            cancelUploadBtn.style.display = 'block';
            saveGalleryBtn.style.display = 'block';
            this.fetchUploadData();
        });

        saveGalleryBtn.onclick = () => {
            location.reload();
        };

        // Cancel upload, delete all uploaded images on cloudinary
        cancelUploadBtn.onclick = () => {
            uploadGalleryForm.style.display = 'none';
            saveGalleryBtn.style.display = 'none';
            updateGalleryBtn.style.display = 'block';
        };
    },
    start: function() {
        this.getCurrentImageUrls();
        this.eventHandler();
    }
}

detailPageHandler.start();

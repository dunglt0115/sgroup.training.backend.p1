const gallery = document.querySelectorAll('#gallery a');
const uploadGalleryForm = document.getElementById('uploadGalleryForm');
const updateGalleryBtn = document.getElementById('updateGallery');
const deleteGalleryBtn = document.getElementById('deleteGallery');
const cancelUploadBtn = document.getElementById('cancelUpload');

const detailPageHandler = {
    eventHandler: function() {
        // Prevent redirect when click on image
        gallery.forEach(image => {
            image.onclick = (e) => {
                e.preventDefault();
            }
        });

        // Toggle upload form
        if (gallery.length == 0) {
            uploadGalleryForm.style.display = 'block';
        } else {
            uploadGalleryForm.style.display = 'none';
        }

        updateGalleryBtn.onclick = () => {
            uploadGalleryForm.style.display = 'block';
        }

        cancelUploadBtn.onclick = () => {
            uploadGalleryForm.style.display = 'none';
        }
    },
    start: function() {
        this.eventHandler();
    }
}

detailPageHandler.start();

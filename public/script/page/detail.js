// Upload form related
const galleryName = document.getElementById('galleryName').value;
const filesInput = document.getElementById('images');
const uploadGalleryForm = document.getElementById('uploadGalleryForm');
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
    imageUrls: [],
    getCurrentImageUrls: function() {
        document.querySelectorAll('.img-fluid').forEach(image => {
            detailPageHandler.imageUrls.push(image.src);
        });
    },
    renderGallery: function() {
        const imageNames = this.imageUrls.map(item => {
            const arrFromUrl = item.split('/');
            const tempArr = arrFromUrl[arrFromUrl.length - 1].split('.');
            tempArr.splice(tempArr.length - 2, 1);

            return tempArr.join('.');
        });

        const htmls = this.imageUrls.map((item, index) => {
            return `
                <tr>
                    <td>
                        <div class="form-check" id="publicIds">
                            <input class="form-check-input check-input-row" type="checkbox" name="publicIds[]" value="many/${galleryName}/${imageNames[index]}" placeholder="${item}">
                        </div>
                    </td>
                    <td>${imageNames[index]}</td>
                    <td>
                        <img src="${item}" height="80px" width="120px">
                    </td>
                </tr>
            `
        });

        tbody.innerHTML = htmls.join('');
    },
    renderCheckboxAllSubmitBtn: function() {
        const checkAllSubmitBtn = $('.check-all-submit-btn');
        let checkedCount = $('input[name="publicIds[]"]:checked').length;

        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false);
        } else {
            checkAllSubmitBtn.attr('disabled', true);
        }
    },
    dynamicDeleteCurrentGallery: function() {
        const action = document.getElementById('selectAction').value;
        const urls = [];
        const publicIds = [];
        
        document.querySelectorAll('.check-input-row:not(.isChecked)').forEach(item => {
            urls.push(item.placeholder);
        });

        document.querySelectorAll('#publicIds .isChecked').forEach(item => {
            publicIds.push(item.value);
        });

        return fetch('http://localhost:3000/media/deletemany', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'credentials': 'include',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action,
                urls,
                galleryName,
                publicIds,
            }),
        });
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
            detailPageHandler.imageUrls = [];
            responseUrls.images.forEach(url => {
                detailPageHandler.imageUrls.push(url);
            });
        }
    },
    listenToPreviewFormEvents: function() {
        const _this = this;
        const checkboxAll = $('#checkboxAll');
        const imageItemCheckbox = $('input[name="publicIds[]"]');

        checkboxAll.change(function() {
            let isCheckedAll = $(this).prop('checked');
            imageItemCheckbox.prop('checked', isCheckedAll);

            if ($('.check-input-row:not(.isChecked)').length > 0) {
                $('.check-input-row:not(.isChecked)').toggleClass('isChecked');
            } else {
                $('.check-input-row').toggleClass('isChecked');
            }

            _this.renderCheckboxAllSubmitBtn();
        });
    
        imageItemCheckbox.change(function() {
            let isCheckedAll = imageItemCheckbox.length === $('input[name="publicIds[]"]:checked').length;
            checkboxAll.prop('checked', isCheckedAll);
            _this.renderCheckboxAllSubmitBtn();
        });
    
        document.querySelectorAll('#publicIds input').forEach(item => {
            item.addEventListener('change', function() {
                item.classList.toggle('isChecked');
            })
        });
    },
    afterSubmitPreviewForm: function() {
        const _this = this;

        _this.imageUrls = [];

        document.querySelectorAll('.check-input-row:not(.isChecked)').forEach(item => {
            _this.imageUrls.push(item.placeholder);
        });

        _this.renderGallery();
    },
    eventHandler: function() {
        const _this = this;

        // Prevent redirect when click on image
        document.querySelectorAll('#gallery').forEach(image => {
            image.onclick = (e) => {
                e.preventDefault();
            }
        });

        // Event with upload form
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
            document.getElementById('gallery').style.display = 'none';
            uploadNewBtn.style.display = 'none';
            updateCurrentBtn.style.display = 'none';
            previewForm.style.display = 'block';
            _this.renderGallery();
            _this.listenToPreviewFormEvents();
        };

        document.querySelector('.cancel').onclick = () => {
            location.reload();
        };
        
        // If user want to upload new gallery
        filesInput.onchange = () => {
            if (filesInput.files.length > 0) {
                document.getElementById('uploadBtn').disabled = false;
            }
        };

        uploadNewBtn.onclick = () => {
            document.querySelector('.gallery-title').style.display = 'none';
            document.getElementById('gallery').style.display = 'none';
            uploadGalleryForm.style.display = 'block';
            uploadNewBtn.style.display = 'none';
            updateCurrentBtn.style.display = 'none';
        };

        uploadGalleryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            document.getElementById('uploadBtn').disabled = true;
            await _this.fetchUploadData();

            saveGalleryBtn.style.display = 'block';
            previewForm.style.display = 'block';
            _this.renderGallery();

            _this.listenToPreviewFormEvents();
        });

        // Listen to preview form when update current or upload new
        previewForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const response = await _this.dynamicDeleteCurrentGallery();

            if (!response.ok) {
                alert('Error');
            } else {
                alert('Success');
                _this.afterSubmitPreviewForm();
                saveGalleryBtn.style.display = 'block';
            }
        });

        saveGalleryBtn.onclick = () => {
            location.reload();
        };
    },
    start: function() {
        this.getCurrentImageUrls();
        this.eventHandler();
    }
}

detailPageHandler.start();

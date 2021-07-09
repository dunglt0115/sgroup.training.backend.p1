document.addEventListener("DOMContentLoaded", function() {
    let articleId;
    const deleteArticleBtn = document.querySelector("#btn-delete-article");
    const restoreBtns = document.querySelectorAll(".restore-btn");
    const checkboxAll = $('#checkboxAll');
    const articleItemCheckbox = $('input[name="articleIds[]"]');
    const checkAllSubmitBtn = $('.check-all-submit-btn');
    const containerForm = $('#containerForm');

    $('#delete-article-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        articleId = button.data('id');
    });

    deleteArticleBtn.onclick = async function() {
        const response = await fetch(`http://localhost:3000/articles/${articleId}/force`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    }

    restoreBtns.forEach(item => {
        item.onclick = async () => {
            const restoreArticleId = item.placeholder;

            const response = await fetch(`http://localhost:3000/articles/${restoreArticleId}/restore`, {
                method: 'PATCH'
            });

            if (!response.ok) {
                alert('Error');
            } else {
                return location.reload();
            }
        }
    })

    restoreBtns.forEach(item => {
        item.onclick = async () => {
            const restoreArticleId = item.placeholder;
            
            const response = await fetch(`http://localhost:3000/articles/${restoreArticleId}/restore`, {
                method: 'PATCH'
            });

            if (!response.ok) {
                alert('Error');
            } else {
                return location.reload();
            }
        }
    })

    checkboxAll.change(function() {
        let isCheckedAll = $(this).prop('checked');
        articleItemCheckbox.prop('checked', isCheckedAll);
        articleItemCheckbox.toggleClass('isChecked');
        renderCheckboxAllSubmitBtn();
    });

    articleItemCheckbox.change(function() {
        let isCheckedAll = articleItemCheckbox.length === $('input[name="articleIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderCheckboxAllSubmitBtn();
    });

    document.querySelectorAll('#articleIds input').forEach(item => {
        item.addEventListener('change', function() {
            item.classList.toggle('isChecked');
        })
    });

    function renderCheckboxAllSubmitBtn() {
        let checkedCount = $('input[name="articleIds[]"]:checked').length;
        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false);
        } else {
            checkAllSubmitBtn.attr('disabled', true);
        }
    }

    containerForm.on('submit', async function(e) {
        e.preventDefault();

        const actions = document.getElementById('selectActions').value;
        const checkboxIds = document.querySelectorAll('#articleIds .isChecked');
        let articleIds = [];
        
        checkboxIds.forEach(item => {
            articleIds.push(item.value);
        })

        const response = await fetch('http://localhost:3000/articles/trash-page-handle-form', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'credentials': 'include',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                actions,
                articleIds,
            }),
        })

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    })
})
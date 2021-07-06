document.addEventListener("DOMContentLoaded", function() {
    let articleId;
    const btnDeleteArticle = document.querySelector("#btn-delete-article");
    const checkboxAll = $('#checkboxAll');
    const articleItemCheckbox = $('input[name="articleIds[]"]');
    const checkAllSubmitBtn = $('.check-all-submit-btn');
    const containerForm = $('#containerForm');

    $('#delete-article-modal').on('show.bs.modal', function(e) {
        let button = $(e.relatedTarget);
        articleId = button.data('id');
    });

    btnDeleteArticle.onclick = async function() {
        const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            alert('Error');
        } else {
            return location.reload();
        }
    };

    checkboxAll.change(function() {
        let isCheckedAll = $(this).prop('checked');
        articleItemCheckbox.prop('checked', isCheckedAll);
        renderCheckboxAllSubmitBtn();
    });

    articleItemCheckbox.change(function() {
        let isCheckedAll = articleItemCheckbox.length === $('input[name="articleIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderCheckboxAllSubmitBtn();
    });

    containerForm.on('submit', async function(e) {
        e.preventDefault();

        const actions = document.getElementById('selectActions').value;
        const checkboxIds = document.querySelectorAll('#articleIds input');
        let articleIds = [];
        
        checkboxIds.forEach(item => {
            articleIds.push(item.value);
        })

        const response = await fetch('http://localhost:3000/articles/archieve-page-handle-form', {
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

    function renderCheckboxAllSubmitBtn() {
        let checkedCount = $('input[name="articleIds[]"]:checked').length;
        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false);
        } else {
            checkAllSubmitBtn.attr('disabled', true);
        }
    }
});

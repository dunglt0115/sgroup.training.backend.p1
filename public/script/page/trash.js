document.addEventListener("DOMContentLoaded", function() {
    let articleId;
    const deleteArticleBtn = document.querySelector("#btn-delete-article");
    const restoreForm = document.querySelectorAll(".restore-form");

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

    restoreForm.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const restoreArticleId = $(this).data('id');

            const response = await fetch(`http://localhost:3000/articles/${restoreArticleId}/restore`, {
                method: 'PATCH'
            });

            if (!response.ok) {
                alert('Error');
            } else {
                return location.reload();
            }
        })
    })
})
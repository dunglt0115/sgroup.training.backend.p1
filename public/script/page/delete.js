document.addEventListener("DOMContentLoaded", function() {
    let articleId;
    const btnDeleteArticle = document.querySelector("#btn-delete-article");

    $('#delete-article-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
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
    }
})
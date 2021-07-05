document.getElementById('editArticle').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const slug = document.getElementById('slug').value;

    const response = await fetch(`http://localhost:3000/articles/update`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'credentials': 'include',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            slug
        })
    });

    if (!response.ok) {
        alert('Error');
    } else {
        return location.href = 'http://localhost:3000/me/stored/articles';
    }
})

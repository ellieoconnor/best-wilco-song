const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteSong);
});

Array.from(thumbText).forEach((element) => {
    element.addEventListener('click', addLike);
});

async function deleteSong() {
    const sName = this.parentNode.childNodes[1].innerText;
    const aName = this.parentNode.childNodes[3].innerText;
    try {
        const response = await fetch('deleteSong', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'songNameS': sName,
                'albumNameS': aName
            })
        });

        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

async function addLike() {
    const sName = this.parentNode.childNodes[1].innerText;
    const aName = this.parentNode.childNodes[3].innerText;
    const tLikes = Number(this.parentNode.childNodes[5].innerText);

    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'songNameS': sName,
                'albumNameS': aName,
                'likesS': tLikes
            })
        });

        const data = await response.json();
        console.log(data);
        location.reload()
    } catch (err) {
        console.error(err);
    }
}
const parentList = document.getElementById('parentList');
parentList.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        console.log('Clicked on', event.target.textContent);
    }
});
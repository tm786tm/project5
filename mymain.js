makeRequest = () => {
    let apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
    apiRequest.send();
    apiRequest.onreadystatechange = () => {
        if ((apiRequest.readyState === 4) && (apiRequest.status === 200)) {
            createCard(JSON.parse(apiRequest.response));
        }
    }
}

createCard = (response) => {
    const main = document.querySelector('main');
    for (let i in response) {
        const card = document.createElement('Article');
        const img = response[i].imageUrl;
        const newImg = document.createElement('IMG');
        const newA = document.createElement('a');

        card.classList.add('col-12', 'col-sm-6', 'card', 'p-3', 'm-0');
        newA.setAttribute('href', 'item.html?id=' + response[i]._id);
        newA.textContent = 'View More Details';

        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        card.innerHTML += '<h2>' + response[i].name + '</h2>';
        card.innerHTML += '<p>' + response[i].description + '</p>';
        card.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';

        card.appendChild(newImg);
        card.appendChild(newA);
        main.appendChild(card);
    }
}

makeRequest();

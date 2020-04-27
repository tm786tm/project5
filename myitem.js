           
requestData = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    let apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
    apiRequest.send();
    return apiRequest;
}

createCard = (response) => {
    const card = document.createElement('Article');
    const img = response.imageUrl;
    const newImg = document.createElement('IMG');
    const btn = document.createElement('button');
    const form = document.createElement('form');

    newImg.classList.add('img');
    newImg.setAttribute('width', '100%');
    newImg.setAttribute('src', img);
    card.appendChild(newImg);

    card.classList.add('col', 'card', 'p-3');
    card.innerHTML += '<h2>' + response.name + '</h2>';

    for (let x in response.lenses) {
        const radio = document.createElement('input');
        const label = document.createElement('label');
        const br = document.createElement('br');
        
        radio.classList.add('mr-3');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'lense');
        radio.setAttribute('value', response.lenses[x]);
        radio.setAttribute('id', 'radio' + response.lenses[x]);
        radio.setAttribute('id', 'radio' + response.lenses[x]);

        label.innerHTML = response.lenses[x];
        label.setAttribute('for', 'radio' + response.lenses[x]);
        form.appendChild(radio);
        form.appendChild(label);
        form.appendChild(br);
        card.appendChild(form);
    }
    card.innerHTML += '<p>' + response.description + '</p>';
    card.innerHTML += '<p>' + '$' + response.price / 100 + '</p>';

    btn.classList.add('btn', 'btn-secondary', 'w-25', 'mx-auto');
    btn.innerHTML = 'Add to Cart';
    btn.addEventListener('click', () => {
        const len = getSelection();
        if (len != undefined) {
            const data = { name: response.name, id: response._id, lenses: len, description: response.description, price: response.price }
            localStorage.setItem(response._id + len, JSON.stringify(data));
        } else {
            alert('makes selection');
        }
    });

    card.appendChild(btn);
    return card;
}

getSelection = () => {
    const selection = document.getElementsByTagName('input');
    for (let x in selection) {
        if (selection[x].checked == true) {
            return selection[x].value;
        }
    }
}

const apiRequest = requestData();

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        const response = JSON.parse(apiRequest.response);
        const main = document.querySelector('main');
        const card = createCard(response);
        main.appendChild(card);
    }
}

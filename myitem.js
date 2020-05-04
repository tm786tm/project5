makeRequest = () => {
    return new Promise((resolve, reject) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Request Failed!!!')
                }
            }
        }
    });
}

createCard = (response) => {
    const card = document.createElement('Article');
    const img = response.imageUrl;
    const newImg = document.createElement('IMG');
    const btn = document.createElement('button');
    const form = document.createElement('form');
    const main = document.querySelector('main');
    const dropMenuLabel = document.createElement('label');
    const dropMenu = document.createElement('select');

    newImg.classList.add('img');
    newImg.setAttribute('width', '100%');
    newImg.setAttribute('src', img);
    card.appendChild(newImg);

    card.classList.add('col', 'card', 'p-3');
    card.innerHTML += '<h2>' + response.name + '</h2>';

    dropMenuLabel.innerHTML = 'Choose you Lense here &nbsp;&nbsp;&nbsp;';
    form.appendChild(dropMenuLabel);
    form.appendChild(dropMenu);
    for (let x in response.lenses) {
        const option = document.createElement('option');
        option.innerHTML = response.lenses[x];
        option.setAttribute('value', response.lenses[x])
        dropMenu.appendChild(option);
    }
    card.appendChild(form);

    card.innerHTML += '<p>' + response.description + '</p>';
    card.innerHTML += '<p>' + '$' + response.price / 100 + '</p>';

    btn.classList.add('btn', 'btn-secondary', 'w-25', 'mx-auto');
    btn.innerHTML = 'Add to Cart';
    btn.addEventListener('click', () => {
        const len = getSelection();
        const data = { name: response.name, id: response._id, lenses: len, description: response.description, price: response.price }
        localStorage.setItem(response._id, JSON.stringify(data));
        card.innerHTML += '<p class ="text-center text-success">Item Added to the cart</p>';
    });

    card.appendChild(btn);
    main.appendChild(card);
}

getSelection = () => {
    const selection = document.getElementsByTagName('option');
    for (let x in selection) {
        if (selection[x].selected == true) {
            return selection[x].value;
        }
    }
}

init = async () => {
    try {
        const response = await makeRequest();
        createCard(response);
    } catch (error) {
        console.log(error);
    }
}

init();



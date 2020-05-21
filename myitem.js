//function to make api request
makeRequest = () => {
    return new Promise((resolve, reject) => {
        //id is retreived from the querystring searchparam
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        let apiRequest = new XMLHttpRequest();
        //id is used to build the unique url for the single item page.
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                     //if ready state and status return success codes resolve promise with response.
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    //if unsuccessfull reject with error message.
                    reject('Something Went Wrong - API Request Failed!!!')
                }
            }
        }
    });
}

createCard = (response) => {
    //create and query elements
    const card = document.createElement('Article');
    const img = response.imageUrl;
    const newImg = document.createElement('IMG');
    const btn = document.createElement('button');
    const form = document.createElement('form');
    const main = document.querySelector('main');
    const dropMenuLabel = document.createElement('label');
    const dropMenu = document.createElement('select');
    const newP = document.createElement('p');

    //setup classes and attributes and append to card
    newImg.classList.add('img');
    newImg.setAttribute('width', '100%');
    newImg.setAttribute('src', img);
    card.appendChild(newImg);

    card.classList.add('col', 'card', 'p-3');
    card.innerHTML += '<h2>' + response.name + '</h2>';

    //setup the dropdown menu
    dropMenuLabel.innerHTML = 'Choose you Lense here &nbsp;&nbsp;&nbsp;';
    form.appendChild(dropMenuLabel);
    form.appendChild(dropMenu);
    //loop to get all lenses and display
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
    newP.classList.add('text-center', 'text-success');

    //button listens for a click event and saves camera and lense choice to localstorage
    btn.addEventListener('click', () => {
        const len = document.querySelector('select').value;
        const data = { name: response.name, id: response._id, lenses: len, description: response.description, price: response.price };
        localStorage.setItem(response._id + len, JSON.stringify(data));
        newP.innerText = response.name + ' with the ' + len + ' lense added to the cart.';
        card.appendChild(newP);

    });
    card.innerHTML += '<a href = "index.html">Back to Shop</a>';
    card.appendChild(btn);

    main.appendChild(card);

}

init = async () => {
    try {
        //call makeRequest for api request and await response
        const requestPromise = makeRequest();
        const response = await requestPromise;

        //pass response to createCard function to display results
        createCard(response);

    } catch (error) {
        //error message displayed if request fails.
        document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
    }
}

init();



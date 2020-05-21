//function to make api request
makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    //if ready state and status return success codes resolve promise with response.
                    resolve(JSON.parse(apiRequest.response));
                }
                else {
                    //if unsuccessfull reject with error message.
                    reject('Something Went Wrong - API Request Failed!!!');
                }
            }
        }
    });
}

createCard = (response) => {
    const main = document.querySelector('main');
    for (let i in response) {
        //create elements for the card
        const card = document.createElement('Article');
        const img = response[i].imageUrl;
        const newImg = document.createElement('IMG');
        const newA = document.createElement('a');

        //add the bootstrap classes and attributes
        card.classList.add('col-12', 'col-sm-6', 'card', 'p-3', 'm-0');
        //id is passed in a querystring
        newA.setAttribute('href', 'item.html?id=' + response[i]._id);
        newA.textContent = 'View More Details';
        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        //items description added
        card.innerHTML += '<h2>' + response[i].name + '</h2>';
        card.innerHTML += '<p>' + response[i].description + '</p>';
        card.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';

        //append the completed elements to the card
        card.appendChild(newImg);
        card.appendChild(newA);
        main.appendChild(card);
    }
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


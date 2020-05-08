displayProductsHeadings = () => {
    const br = document.createElement('br');
    if (localStorage.length == 0) {
        document.getElementById('orderSection').remove();
        main.innerHTML = '<h2 class = "text-center">Your Shopping Cart is Currently Empty</h2>';
    } else {
        const heading = document.createElement('h2');
        heading.innerHTML = 'Items in Your Cart';
        heading.classList.add('text-center')
        main.parentNode.insertBefore(heading, main);
        heading.parentNode.insertBefore(br, heading);
        const tHeader = document.createElement('tr');
        tHeader.innerHTML = '<th>Name</th>' + '<th>Lense</th>' + '<th>Price</th>' + '<th></th>';
        table.appendChild(tHeader);
    }
}

displayProducts = () => {
    const total = document.createElement('h5');

    for (let i = 0; i < localStorage.length; i++) {
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const tRow = document.createElement('tr');
        const name = document.createElement('td');
        const lense = document.createElement('td');
        const price = document.createElement('td');
        const x = document.createElement('td');
        const xButton = document.createElement('button');

        table.setAttribute('id', 'table');
        table.classList.add('table');
        main.appendChild(table);

        xButton.classList.add('btn', 'btn-danger');

        name.innerHTML = data.name;
        products[i] = data.id;
        lense.innerHTML = data.lenses;
        price.innerHTML = '$' + data.price / 100;
        x.innerHTML = '';
        xButton.innerHTML = 'X';
        x.appendChild(xButton);

        totalPrice += data.price;
        total.classList.add('text-center');
        total.innerHTML = 'Total Price is - $' + totalPrice / 100;
        sessionStorage.setItem('price', JSON.stringify(totalPrice));
        main.appendChild(total);

        xButton.addEventListener('click', () => {
            localStorage.removeItem(localStorage.key(i));
            xButton.parentElement.parentElement.remove();
            location.reload();
        });
        tRow.appendChild(name);
        tRow.appendChild(lense);
        tRow.appendChild(price);
        tRow.appendChild(x);
        table.appendChild(tRow);
    }
}

submition = () => {
    const submitButton = document.getElementById('submitButton');
    const surname = document.getElementById('surname');
    const forename = document.getElementById('forename');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    surname.addEventListener('blur', () => {
        const surnameError = document.getElementById('surnameError');
        const isValidSurname = surname.checkValidity();
        if (isValidSurname) {
            surnameError.classList.add('d-none');
        }
        else {
            surnameError.classList.remove('d-none');
        }
    });

    forename.addEventListener('blur', () => {
        const forenameError = document.getElementById('forenameError');
        const isValidForename = forename.checkValidity();
        if (isValidForename) {
            forenameError.classList.add('d-none');
        }
        else {
            forenameError.classList.remove('d-none');
        }
    });

    city.addEventListener('blur', () => {
        const cityError = document.getElementById('cityError');
        const isValidCity = city.checkValidity();
        if (isValidCity) {
            cityError.classList.add('d-none');
        }
        else {
            cityError.classList.remove('d-none');
        }
    });

    email.addEventListener('blur', () => {
        const emailError = document.getElementById('emailError');
        const isValidEmail = email.checkValidity();
        if (isValidEmail) {
            emailError.classList.add('d-none');
        }
        else {
            emailError.classList.remove('d-none');
        }
    });

    submitButton.addEventListener('click', ($event) => {
        $event.preventDefault();
        const isValidEmail = email.checkValidity();
        const isValidSurname = surname.checkValidity();
        const isValidForename = forename.checkValidity();
        const isValidCity = city.checkValidity();
        const contact = {
            firstName: forename.value,
            lastName: surname.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };

        const orderObject = {
            contact, products
        };

        if ((forename.value != '') && (surname.value != '') && (address.value != '') && (city.value != '') && (email.value != '') && (isValidEmail) && (isValidSurname) && (isValidForename) && (isValidCity)) {
            console.log('hi');
            submitForm(orderObject);
        }
        else{
            const submitError = document.getElementById('submitError');
            submitError.classList.remove('d-none');
        }

    });
}


submitForm = async (orderObject) => {
    try {
        const requestPromise = makeRequest(orderObject);
        const response = await requestPromise;
        displayConfirmation(response);

    } catch (error) {
        console.log('caught error ' + error);
    }
}

makeRequest = (data) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('POST', 'http://localhost:3000/api/cameras/order');
        apiRequest.setRequestHeader('Content-Type', 'application/json');
        apiRequest.send(JSON.stringify(data));
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 201) {
                    resolve(JSON.parse(apiRequest.response));
                }
                if (apiRequest.status === 400) {
                    reject(JSON.parse(apiRequest.response));
                }
            }
        };
    });
}

displayConfirmation = (response) => {
    localStorage.clear();
    sessionStorage.setItem('data', JSON.stringify(response));
    window.location = 'confirmation.html';
}

const main = document.querySelector('main');
const table = document.createElement('table');
const products = [];

displayProductsHeadings();
let totalPrice = 0;
displayProducts();
submition();

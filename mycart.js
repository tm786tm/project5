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

validation = () => {
    const submitButton = document.getElementById('submitButton');
    const surname = document.getElementById('surname');
    const forename = document.getElementById('forename');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
    let isSurnameValid = false;
    let isForenameValid = false;
    let isValidAddress = false;
    let isCityValid = false;
    let isEmailValid = false;
    
    const regName = /^[A-Za-z]{3,32}$/;
    const regAddress = /^[A-Za-z0-9 ]{7,32}$/;
    const emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

     surname.addEventListener('blur', () => {
        if (regName.test(surname.value)){
            surnameError.classList.add('d-none');
            isSurnameValid = true;
            surname.style.border = 'medium solid green';
        }
        else{0
            surnameError.classList.remove('d-none');
            isSurnameValid = false;
            surname.style.border = 'medium solid red';
        }
     });

     forename.addEventListener('blur', () => {
        if ((forename.value.length >= 3) && (forename.value.length <= 32) && (regName.test(forename.value))){
            forenameError.classList.add('d-none');
            isForenameValid = true;
            forename.style.border = 'medium solid green';
        }
        else{
            forenameError.classList.remove('d-none');
            isForenameValid = false;
            forename.style.border = 'medium solid red';
        }
     });
    
     address.addEventListener('blur', () => {
        if ((address.value.length >= 3) && (address.value.length <= 32) && (regAddress.test(address.value))){
            addressError.classList.add('d-none');
            isValidAddress = true;
            address.style.border = 'medium solid green';
        }
        else{
            addressError.classList.remove('d-none');
            isValidAddress = false;
            address.style.border = 'medium solid red';
        }
     });

     city.addEventListener('blur', () => {
        if ((city.value.length >= 3) && (city.value.length <= 32) && (regName.test(city.value))){
            cityError.classList.add('d-none');
            isCityValid = true;
            city.style.border = 'medium solid green';
        }
        else{
            cityError.classList.remove('d-none');
            isCityValid = false;
            city.style.border = 'medium solid red';
        }
     });
         
     email.addEventListener('blur', () => {
        if ((email.value.length >= 3) && (email.value.length <= 32) && (emailReg.test(email.value))){
            emailError.classList.add('d-none');
            isEmailValid = true;
            email.style.border = 'medium solid green';
            submitError.classList.add('d-none');
        }
        else{
            emailError.classList.remove('d-none');
            isEmailValid = false;
            email.style.border = 'medium solid red';
        }
     });

    // email.addEventListener('blur', () => {
    //     const emailError = document.getElementById('emailError');
    //     const isValidEmail = email.checkValidity();
    //     if (isValidEmail) {
    //         emailError.classList.add('d-none');
    //     }
    //     else {
    //         emailError.classList.remove('d-none');
    //     }
    // });

    submitButton.addEventListener('click', ($event) => {
        $event.preventDefault();
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
        console.log(isSurnameValid);
        if ((isSurnameValid) && (isForenameValid) && (isCityValid) && (isEmailValid) && (isValidAddress)){//} && (isValidEmail) && (isValidSurname) && (isValidForename) && (isValidCity)) {
            console.log('hi');
            submitForm(orderObject);
        }
        else{
            const submitError = document.getElementById('submitError');
            submitError.classList.remove('d-none');
        }
        if(surname.value ===''){
            surnameError.classList.remove('d-none');
            surname.style.border = 'medium solid red';
        }
        if(forename.value ===''){
            forenameError.classList.remove('d-none');
            forename.style.border = 'medium solid red';
        }
        if(address.value ===''){
            addressError.classList.remove('d-none');
            address.style.border = 'medium solid red';
        }
        if(city.value ===''){
            cityError.classList.remove('d-none');
            city.style.border = 'medium solid red';
        }
        if(email.value ===''){
            emailError.classList.remove('d-none');
            email.style.border = 'medium solid red';
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
validation();

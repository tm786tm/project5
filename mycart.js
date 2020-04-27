createTable = (i) => {
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
    products[i]=data.id;
    lense.innerHTML = data.lenses;
    price.innerHTML = '$' + data.price / 100;
    x.innerHTML = '';
    xButton.innerHTML = 'X';
    x.appendChild(xButton);

    emptyButon.classList.add('btn', 'btn-secondary', 'w-25', 'mx-auto', 'mb-3');

    totalPrice += data.price;
    total.classList.add('text-center');
    total.innerHTML = 'Total Price is - $' + totalPrice / 100;
    main.appendChild(total);

    emptyButon.innerHTML = 'Empty Cart';
    //main.appendChild(emptyButon);

    emptyButon.addEventListener('click', () => {
        window.localStorage.clear();
        table.remove();
        main.innerHTML = '<h2 class = "text-center">Your Shopping Cart is Currently Empty</h2>';
    });
    xButton.addEventListener('click', () => {
        localStorage.removeItem(localStorage.key(i));
        xButton.parentElement.parentElement.remove();
        location.reload();
    });
    tRow.appendChild(name);
    tRow.appendChild(lense);
    tRow.appendChild(price);
    tRow.appendChild(x);
    return tRow;
}

tableHeadings = () => {
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

makeRequest = (data) => {

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/api/cameras/order');
        request.onreadystatechange = () => {
            
            if (request.readyState === 4){
                if (request.status === 201){
                    console.log('success');
                    resolve(JSON.parse(request.response));
                }
                if (request.status === 400){
                    reject(JSON.parse(request.response));
                    console.log('Bad request');
                }
            }  
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
        
        
    });
}

async function submitForm(orderObject) {
    try{
        const requestPromise = makeRequest(orderObject);
        const response = await requestPromise;
        console.log(response);
        
    }catch(error){
        console.log('caught error '+error);
    }
}

const emptyButon = document.createElement('button');
const main = document.querySelector('main');
const total = document.createElement('h5');
const table = document.createElement('table');
const br = document.createElement('br');
const submitButton = document.getElementById('submitButton');
const surname = document.getElementById('surname');
const forename = document.getElementById('forename');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const camera = localStorage.getItem(localStorage.key(0));
const products = [];

tableHeadings();

let totalPrice = 0;
for (let i = 0; i < localStorage.length; i++) {
    const tRow = createTable(i);
    table.appendChild(tRow);
}

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
    }
    //window.location ='https://www.google.com';
    console.log(orderObject);
    submitForm(orderObject);
});




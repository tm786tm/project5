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

const emptyButon = document.createElement('button');
const main = document.querySelector('main');
const total = document.createElement('h5');
const table = document.createElement('table');
const br = document.createElement('br');

tableHeadings();

let totalPrice = 0;
for (let i = 0; i < localStorage.length; i++) {
    const tRow = createTable(i);
    table.appendChild(tRow);
}






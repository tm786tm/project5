
const btn = document.createElement('button');
const main = document.querySelector('main');
const total = document.createElement('h3');
const table = document.createElement('table');
const tHeader = document.createElement('tr');
tHeader.innerHTML = '<th>Name</th>' + '<th>Lense</th>' + '<th>Price</th>' + '<th></th>';
table.appendChild(tHeader);
let totalPrice = 0;
for (let i = 0; i < localStorage.length; i++) {

    const tRow = document.createElement('tr');
    
    const name = document.createElement('td');
    const lense = document.createElement('td');
    const price = document.createElement('td');
    const x = document.createElement('td');
    const xButton = document.createElement('button');
    let data = JSON.parse(localStorage.getItem(localStorage.key(i)));

    
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
    btn.classList.add('btn', 'btn-secondary', 'w-25', 'mx-auto', 'mb-3');

    totalPrice += data.price;
    total.classList.add('text-center');
    total.innerHTML = 'Total Price is - $' + totalPrice / 100;
    main.appendChild(total);

    btn.innerHTML = 'Empty Cart';
    main.appendChild(btn);

    btn.addEventListener('click', () => {
        window.localStorage.clear();
        table.remove();
        main.innerHTML = '<h2 class = "text-center">Your Shopping Cart is Currently Empty</h2>';
        

    });
    xButton.addEventListener('click', () => {
        console.log('removing ' + window.localStorage.key(i))
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
if (localStorage.length == 0) {
    main.innerHTML = '<h2 class = "text-center">Your Shopping Cart is Currently Empty</h2>';
}



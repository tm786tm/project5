const data = JSON.parse(sessionStorage.getItem('d'));
const price = JSON.parse(sessionStorage.getItem('price'));
const orderId = document.getElementById('orderId');
const totalPrice = document.getElementById('totalPrice');
orderId.innerText = data.orderId;
totalPrice.innerText = '$' + price/100;
console.log(data.orderId);
console.log(price);
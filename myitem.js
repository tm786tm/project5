const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const main = document.querySelector('main');

let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
apiRequest.send();

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        const responce = JSON.parse(apiRequest.response);

        const card = document.createElement('Article');
        const img = responce.imageUrl;
        const newImg = document.createElement('IMG');
        const btn = document.createElement('button');
        const form = document.createElement('form');


        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);
        card.appendChild(newImg);

        card.classList.add('col', 'card', 'p-3');
        card.innerHTML += '<h2>' + responce.name + '</h2>';

        for (let x in responce.lenses) {
            const radio = document.createElement('input');
            const label = document.createElement('label');
            const br = document.createElement('br');
            radio.classList.add('mr-3');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', 'lense');
            radio.setAttribute('value', responce.lenses[x]);
            radio.setAttribute('id', 'radio' + responce.lenses[x]);
            radio.setAttribute('id', 'radio' + responce.lenses[x]);

            label.innerHTML = responce.lenses[x];
            label.setAttribute('for', 'radio' + responce.lenses[x]);
            form.appendChild(radio);
            form.appendChild(label);
            form.appendChild(br);
            card.appendChild(form);
        }
        card.innerHTML += '<p>' + responce.description + '</p>';
        card.innerHTML += '<p>' + '$' + responce.price / 100 + '</p>';

        btn.classList.add('btn', 'btn-secondary', 'w-25', 'mx-auto');
        btn.innerHTML = 'Add to Cart';
        btn.addEventListener('click', () => {
            const len = getSelection();
            if (len != undefined) {
                const data = { name: responce.name, lenses: len, description: responce.description, price: responce.price }
                localStorage.setItem(responce._id + len, JSON.stringify(data));
            } else {
                alert('makes selection');
            }
        });

        card.appendChild(btn);
        main.appendChild(card);

    }

    function getSelection() {
        const selection = document.getElementsByTagName('input');
        for (let x in selection) {
            if (selection[x].checked == true) {
                return selection[x].value;
            }
        }
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
//let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

/*
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
    updateCart();
}
*/
function addToCart(productName, productPrice) {
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
    updateCart();
}

/*
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        //div.textContent = `• ${item.name} - R$ ${item.price.toFixed(2)}`;
        div.innerHTML = `<span>• ${item.name} - R$ ${item.price.toFixed(2)}</span>`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-item');
        removeButton.setAttribute('data-index', index);
        removeButton.addEventListener('click', () => removeFromCart(index));

        div.appendChild(removeButton);
        cartItems.appendChild(div);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}
*/
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span style="text-align: left;">• ${item.name} - R$ ${item.price.toFixed(2)}</span>
            <div class="quantity-controls">
                <button onclick="decrementQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="incrementQuantity(${index})">+</button>
            </div>
        `;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-item');
        removeButton.setAttribute('data-index', index);
        removeButton.addEventListener('click', () => removeFromCart(index));
        
        div.appendChild(removeButton);
        cartItems.appendChild(div);
        
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}
function incrementQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// remove itens individuais do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let receipt = 'Resumo da compra:\n';
    cart.forEach(item => {
        //receipt += `• ${item.name} - R$ ${item.price.toFixed(2)}\n`;
        receipt += `• ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    //receipt += `\nTotal: R$ ${totalPrice.toFixed(2)}`;
    receipt += `\nTotal: R$ ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
    // Salva o carrinho no localStorage antes de redirecionar
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'finalizarCompra.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});


// Função para cancelar a compra e limpar o carrinho
window.cancelarCompra = function () {
    if (confirm('Você tem certeza que deseja cancelar a compra?')) {
        localStorage.removeItem('cart');
        alert('Compra cancelada e carrinho esvaziado.');
        window.location.href = './visaoGeral.html';
    }
};
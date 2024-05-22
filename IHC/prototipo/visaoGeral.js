let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;


function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item adicionado ao carrinho');
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
}




function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const cartList = document.createElement('ul');

    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `• ${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(div);
    });

    cartItems.appendChild(cartList);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let receipt = 'Resumo da compra:\n';
    cart.forEach(item => {
        receipt += `• ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    receipt += `\nTotal: R$ ${totalPrice.toFixed(2)}`;
    window.location.href = 'finalizarCompra.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

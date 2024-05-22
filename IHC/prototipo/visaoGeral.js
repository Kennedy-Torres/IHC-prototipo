let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;


function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item adicionado ao carrinho');
    window.location.href = 'finalizarCompra.html';
}




function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItems.innerHTML = '';
    totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(div);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let receipt = 'Resumo da compra:\n';
    cart.forEach(item => {
        receipt += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    receipt += `\nTotal: R$ ${totalPrice.toFixed(2)}`;
    alert(receipt);

    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

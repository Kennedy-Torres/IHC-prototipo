document.addEventListener('DOMContentLoaded', () => {
    const orderDetailsContainer = document.getElementById('orderDetails');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        orderDetailsContainer.innerHTML = '<p>Não há itens no seu pedido.</p>';
    } else {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            orderDetailsContainer.innerHTML += `<p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>`;
        });
        orderDetailsContainer.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    }

    // Limpa o carrinho após exibir os itens
    localStorage.removeItem('cart');
});
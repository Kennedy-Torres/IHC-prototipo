document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
            cartItemsContainer.innerHTML += `<p>${item.name} - R$ ${item.price}</p>`;
        });
        cartItemsContainer.innerHTML += `<p><strong>Total: R$ ${total}</strong></p>`;
    }

    const paymentForm = document.getElementById('paymentForm');
    const cardDetails = document.getElementById('cardDetails');
    paymentForm.paymentMethod.forEach(method => {
        method.addEventListener('change', () => {
            if (method.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const paymentMethod = paymentForm.paymentMethod.value;
        if (paymentMethod === 'card') {
            const cardNumber = paymentForm.cardNumber.value;
            const cardName = paymentForm.cardName.value;
            const cardExpiry = paymentForm.cardExpiry.value;
            const cardCVC = paymentForm.cardCVC.value;
            // Processar pagamento com cartão
            alert(`Pagamento com cartão aprovado! Nome no Cartão: ${cardName}`);
        } else {
            // Processar pagamento com boleto
            alert('Pagamento com boleto gerado!');
        }
        localStorage.removeItem('cart');
        window.location.href = 'compraRealizada.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `<p>• ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>`;
        });
        cartItemsContainer.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    
    }

    const paymentForm = document.getElementById('paymentForm');
    const cardDetails = document.getElementById('cardDetails');

    // Certifique-se de selecionar todos os elementos input com name 'paymentMethod'
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');    
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            if (method.value === 'card') {
                cardDetails.style.display = 'block';
                setCardInputsRequired(true);
            } else {
                cardDetails.style.display = 'none';
                setCardInputsRequired(false);
            }
        });
    });

    // ADD EVENTO PARA FORMA DE PAGAMENTO
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!confirm('Você deseja finalizar a compra?')) {
            return; // Se o usuário clicar em "Cancelar", a função termina aqui
        }


        const paymentMethod = paymentForm.paymentMethod.value;

        if (paymentMethod === 'card') {
            const cardNumber = paymentForm.cardNumber.value;
            const cardName = paymentForm.cardName.value;
            const cardExpiry = paymentForm.cardExpiry.value;
            const cardCVC = paymentForm.cardCVC.value;

            // Basic validation (consider using a library for more robust validation)
            if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
                alert('Preencha todos os dados do cartão!');
                return; // Prevent further processing if validation fails
            }

            // Processar pagamento com cartão
            alert(`Pagamento com cartão aprovado! Nome no Cartão: ${cardName}`);
            window.location.href = 'compraRealizada.html';
        } else if (paymentMethod === 'boleto'){
            // Processar pagamento com boleto
            alert('Pagamento com boleto gerado!');
            window.location.href = 'compraRealizada.html';
        }
    });

    function setCardInputsRequired(isRequired) {
        const cardInputs = document.querySelectorAll('#cardDetails input');
        cardInputs.forEach(input => {
            input.required = isRequired;
        });
    }
});

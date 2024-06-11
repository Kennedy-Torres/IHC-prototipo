// Evento que é disparado quando o conteúdo HTML é totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Obtém os itens do carrinho armazenados no localStorage ou cria um array vazio se não houver nenhum
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Obtém o contêiner onde os itens do carrinho serão exibidos
    const cartItemsContainer = document.getElementById('cartItems');

    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
        // Se estiver vazio, exibe uma mensagem indicando que o carrinho está vazio
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        // Se houver itens no carrinho, inicializa a variável para armazenar o total
        let total = 0;
        // Para cada item no carrinho, calcula o subtotal, exibe os detalhes e adiciona ao total
        cartItems.forEach(item => {
            // Calcula o subtotal do item
            total += item.price * item.quantity;
            // Adiciona os detalhes do item ao contêiner de itens do carrinho
            cartItemsContainer.innerHTML += `<p>• ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>`;
        });
        // Exibe o total do carrinho após todos os itens
        cartItemsContainer.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    }

    // Obtém o formulário de pagamento
    const paymentForm = document.getElementById('paymentForm');
    // Obtém os detalhes do cartão de crédito
    const cardDetails = document.getElementById('cardDetails');
    
    // Obtém todos os elementos de input com o nome 'paymentMethod'
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    // Adiciona um listener de evento para cada método de pagamento
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            // Mostra ou oculta os detalhes do cartão dependendo do método de pagamento selecionado
            if (method.value === 'card') {
                cardDetails.style.display = 'block'; // Mostra os detalhes do cartão
                setCardInputsRequired(true); // Define os campos do cartão como obrigatórios
            } else {
                cardDetails.style.display = 'none'; // Oculta os detalhes do cartão
                setCardInputsRequired(false); // Remove a obrigatoriedade dos campos do cartão
            }
        });
    });

    // Adiciona um listener de evento para o envio do formulário de pagamento
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Pergunta ao usuário se deseja finalizar a compra
        if (!confirm('Você deseja finalizar a compra?')) {
            return; // Se o usuário clicar em "Cancelar", a função termina aqui
        }

        // Obtém o método de pagamento selecionado pelo usuário
        const paymentMethod = paymentForm.paymentMethod.value;

        // Lógica para processar o pagamento com base no método escolhido pelo usuário
        if (paymentMethod === 'card') {
            // Se o método for cartão de crédito, obtém os detalhes do cartão e realiza a validação básica
            const cardNumber = paymentForm.cardNumber.value;
            const cardName = paymentForm.cardName.value;
            const cardExpiry = paymentForm.cardExpiry.value;
            const cardCVC = paymentForm.cardCVC.value;

            // Validação básica dos campos do cartão (pode ser melhorada usando uma biblioteca de validação)
            if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
                alert('Preencha todos os dados do cartão!');
                return; // Impede o processamento adicional se a validação falhar
            }

            // Processamento do pagamento com cartão
            alert(`Pagamento com cartão aprovado! Nome no Cartão: ${cardName}`);
            // Redireciona o usuário para a página de compra realizada
            window.location.href = 'compraRealizada.html';
        } else if (paymentMethod === 'boleto'){
            // Se o método for boleto, processa o pagamento e redireciona para a página de compra realizada
            alert('Pagamento com boleto gerado!');
            window.location.href = 'compraRealizada.html';
        }
    });

    // Função para definir se os campos do cartão são obrigatórios ou não com base no parâmetro fornecido
    function setCardInputsRequired(isRequired) {
        const cardInputs = document.querySelectorAll('#cardDetails input');
        cardInputs.forEach(input => {
            input.required = isRequired;
        });
    }
});

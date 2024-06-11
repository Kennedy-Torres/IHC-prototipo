// Espera o conteúdo HTML ser totalmente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Obtém o elemento HTML onde os detalhes do pedido serão exibidos
    const orderDetailsContainer = document.getElementById('orderDetails');
    // Obtém os itens do carrinho armazenados no localStorage ou cria um array vazio se não houver nenhum
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
        // Se estiver vazio, exibe uma mensagem indicando que não há itens no pedido
        orderDetailsContainer.innerHTML = '<p>Não há itens no seu pedido.</p>';
    } else {
        // Se houver itens no carrinho, inicializa a variável para armazenar o total do pedido
        let total = 0;
        // Para cada item no carrinho, calcula o subtotal, exibe os detalhes do item e adiciona ao total
        cartItems.forEach(item => {
            // Calcula o subtotal do item
            total += item.price * item.quantity;
            // Adiciona os detalhes do item ao contêiner de detalhes do pedido
            orderDetailsContainer.innerHTML += `<p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>`;
        });
        // Exibe o total do pedido após todos os itens
        orderDetailsContainer.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
    }

    // Limpa o carrinho após exibir os itens para evitar que sejam exibidos novamente em uma atualização da página
    localStorage.removeItem('cart');
});

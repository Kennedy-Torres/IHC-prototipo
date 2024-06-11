
// Função que é executada quando o DOM da página é completamente carregado
// se há itens com o id "cart-items", então atualiza o carrinho 
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

// Variável para armazenar os itens do carrinho, carregados do localStorage ou inicializados como um array vazio
let cart = JSON.parse(localStorage.getItem('cart')) || [];


// CRUD - C ... 
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


// CRUD - U ...
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count'); // Seleciona o elemento do contador do carrinho
    
    // Limpa os elementos do carrinho
    cartItems.innerHTML = '';

    let totalPrice = 0; // preço total do carrinho
    let totalItems = 0; // contar o número total de itens no carrinho

    // Percorre os itens do carrinho e os adiciona à lista de itens do carrinho
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
        
        // Calcula o preço total e o número total de itens no carrinho
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity; // Adiciona a quantidade do item ao total de itens
    });

     // Atualiza o preço total e o contador do carrinho
    totalPriceElement.textContent = totalPrice.toFixed(2); 
    cartCountElement.textContent = totalItems; 
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

// CRUD - D ...
// remove itens individuais do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// CRUD - R ...
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let receipt = 'Resumo da compra:\n';
    cart.forEach(item => {
        receipt += `• ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    receipt += `\nTotal: R$ ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`;
    
    // Salva o carrinho no localStorage antes de redirecionar
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'finalizarCompra.html';
}

// CRUD - D ...
// Função para cancelar a compra e limpar o carrinho
window.cancelarCompra = function () {
    if (confirm('Você tem certeza que deseja cancelar a compra?')) {
        localStorage.removeItem('cart');
        alert('Compra cancelada e carrinho esvaziado.');
        window.location.href = './visaoGeral.html';
    }
};




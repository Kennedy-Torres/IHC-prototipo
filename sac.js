// Adiciona um ouvinte de evento para o evento "submit" do formulário de contato
document.getElementById("contact-form").addEventListener("submit", function(event) {
  // Impede o comportamento padrão de envio do formulário
  event.preventDefault(); 
  
  // Exibe um alerta agradecendo ao usuário por entrar em contato
  alert("Obrigado por entrar em contato! Em breve retornaremos sua mensagem.");
});

// Seleciona todos os elementos 'details' dentro do elemento com o ID "faq"
const faqDetails = document.querySelectorAll('#faq details');

// Para cada detalhe do FAQ, adiciona um ouvinte de evento para o evento de 'click'
faqDetails.forEach((detail) => {
detail.addEventListener('click', () => {
  // Seleciona o elemento 'p' dentro do detalhe clicado
  const answer = detail.querySelector('p');
  // Alterna o estilo de exibição do elemento 'p' entre 'block' e 'none'
  answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
});
});

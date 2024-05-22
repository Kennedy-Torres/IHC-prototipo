document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    alert("Obrigado por entrar em contato! Em breve retornaremos sua mensagem.");
});


const faqDetails = document.querySelectorAll('#faq details');

faqDetails.forEach((detail) => {
  detail.addEventListener('click', () => {
    const answer = detail.querySelector('p');
    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
  });
});
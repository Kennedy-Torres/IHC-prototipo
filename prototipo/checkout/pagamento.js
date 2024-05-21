document.addEventListener('DOMContentLoaded', () => {
    const personalForm = document.getElementById('personal-form');
    const addressForm = document.getElementById('address-form');
    const billingForm = document.getElementById('billing-form');
    const submitButton = document.getElementById('submit-btn');

    const validateField = (field) => {
        if (field.value.trim() === '') {
            field.nextElementSibling.textContent = `${field.previousElementSibling.textContent} é obrigatório.`;
            field.nextElementSibling.style.display = 'block';
            return false;
        } else {
            field.nextElementSibling.textContent = '';
            field.nextElementSibling.style.display = 'none';
            return true;
        }
    };

    const validateForm = (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    };

    const enableSubmitButton = () => {
        if (validateForm(personalForm) && validateForm(addressForm) && validateForm(billingForm)) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    };

    const forms = [personalForm, addressForm, billingForm];
    forms.forEach(form => {
        form.addEventListener('input', (event) => {
            validateField(event.target);
            enableSubmitButton();
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (validateForm(form)) {
                alert('Formulário enviado com sucesso!');
            }
        });
    });

    enableSubmitButton(); // Initial check to disable submit button
});
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript logic can remain the same
});

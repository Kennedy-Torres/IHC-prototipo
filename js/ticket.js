const textarea = document.getElementById('Ticket');
const label = document.getElementById('userLabel');

let previousContentHeight = 0; // Initialize a variable to store previous content height

textarea.addEventListener('input', () => {
  const contentHeight = textarea.scrollHeight;
  const labelHeight = label.offsetHeight;

  if (contentHeight > labelHeight) {
    textarea.style.top = labelHeight + 10 + 'px';
  }

  // Store the current content height for future reference
  previousContentHeight = contentHeight;
});

textarea.addEventListener('focus', () => {
  // Do not adjust textarea position on focus
});

textarea.addEventListener('blur', () => {
  // Do not adjust textarea position on blur

  // If there's text in the textarea, keep the adjusted position
  if (textarea.value.trim().length > 0) {
    textarea.style.top = previousContentHeight + 10 + 'px';
  }
});

const formFeedback = document.getElementById('form-feedback');

if (formFeedback) {
  formFeedback.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const feed = e.target.feed.value;

    alert(`Obrigado pelo seu feedback!\n\nEmail: ${email}\nFeedback: ${feed}`);
    e.target.reset();
  });
}

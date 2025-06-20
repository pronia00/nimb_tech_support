const form = document.getElementById('support-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const confirmed = await confirmSend();
    if (!confirmed) return;

    const formData = new FormData(form);
    submitBtn.disabled = true;
    try {
        const response = await fetch('/api/support', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            alert('Ошибка отправки');
        } else {
            alert('Обращение отправлено');
            form.reset();
        }
    } catch (err) {
        alert('Сетевая ошибка');
    } finally {
        submitBtn.disabled = false;
    }
});

function confirmSend() {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.showConfirm) {
        return Telegram.WebApp.showConfirm('Отправить обращение?');
    }
    return Promise.resolve(confirm('Отправить обращение?'));
}

'use strict';

// Index page
try {
  const phone = document.getElementById("phone");
  const allowedKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'Backspace',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'Enter'
  ]

  phone.addEventListener("keydown", e => {
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  })

  phone.addEventListener("input", e => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let parts = [value.slice(0, 2), value.slice(2, 5), value.slice(5, 7), value.slice(7, 9)];

    let result = parts[0];

    for (let i = 1; i < parts.length; i++) {
      if (parts[i]) {
        result += `-${parts[i]}`;
      }
    }

    e.target.value = result;
  })

  const registerButtons = document.querySelectorAll('[data-main-button]');
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalCloserElements = document.querySelectorAll('[data-modal-close]');
  const form = document.querySelector('[data-form]');
  const formAlert = document.querySelector('[data-form-alert]');

  registerButtons.forEach(button => {
    button.addEventListener('click', () => {
      modalBackdrop.classList.remove('hidden')
    })
  })

  function closeModal() {
    modalBackdrop.classList.add('hidden');
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  })

  modalCloserElements.forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.hasAttribute('data-modal-close')) {
        closeModal();
      }
    })
  })

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitButton = e.target.querySelector('[data-form-button]');
    const name = e.target.querySelector('#name').value.trim();
    const phone = e.target.querySelector('#phone').value?.replace(/[^0-9]/g, '');

    if (!name.length) {
      formAlert.textContent = 'Ismingizni kiriting';
      formAlert.classList.remove('hidden');
      return;
    }

    if (phone?.length !== 9) {
      formAlert.textContent = 'Telefon raqamingizni kiriting';
      formAlert.classList.remove('hidden');
      return;
    }

    if (name.length && phone?.length === 9) {
      submitButton.setAttribute('disabled', true);
      submitButton.textContent = 'Yuborilmoqda...'

      localStorage.setItem('user', JSON.stringify({
        name, phone: '+998' + phone, time: new Date().toLocaleString()
      }))

      submitButton.removeAttribute('disabled');
      submitButton.textContent = "Ro'yxatdan o'tish";
      closeModal();
      window.location.href = `../telegram.html`
    }
  })

  // Timer
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  const endTime = new Date('2024-10-04 20:29:59').getTime()

  const timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    if (endTime >= currentTime) {
      let restTime = Math.floor((endTime - currentTime) / 1000);
      const days = Math.floor(restTime / (24 * 3600));
      restTime = restTime - days * (24 * 3600);
      const hours = Math.floor(restTime / 3600);
      restTime = restTime - hours * 3600;
      const minutes = Math.floor(restTime / 60);
      restTime = restTime - minutes * 60;
      const seconds = restTime;

      daysElement.textContent = `${days < 10 ? '0' + days : days}`;
      hoursElement.textContent = `${hours < 10 ? '0' + hours : hours}`;
      minutesElement.textContent = `${minutes < 10 ? '0' + minutes : minutes}`;
      secondsElement.textContent = `${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)

} catch (e) {
}

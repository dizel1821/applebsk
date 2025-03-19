/* Переключение светлой/тёмной темы */
document.getElementById('themeToggle').addEventListener('click', function(e) {
  e.preventDefault();
  const icon = document.getElementById('themeToggleIcon');
  const darkMode = document.body.classList.toggle('dark');
  if (darkMode) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

/* Мобильное меню (гамбургер) */
const menuToggleBtn = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggleBtn.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  const menuIcon = document.getElementById('menuIcon');
  if (navLinks.classList.contains('open')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
});

/* Закрытие мобильного меню при клике на ссылку */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      const menuIcon = document.getElementById('menuIcon');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  });
});

/* Изменение фона шапки при прокрутке */
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.pageYOffset > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* Автокарусель отзывов */
const reviews = document.querySelectorAll('.review');
let currentReview = 0;
if (reviews.length > 0) {
  setInterval(() => {
    reviews[currentReview].classList.remove('active');
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].classList.add('active');
  }, 5000);
}

/* Модальное окно заявки: открытие и закрытие */
const modal = document.getElementById('contact-modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.querySelector('.modal-close');

openModalBtn.addEventListener('click', function() {
  modal.classList.add('open');
});
closeModalBtn.addEventListener('click', function() {
  modal.classList.remove('open');
});
window.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    modal.classList.remove('open');
  }
});

/* Обработка отправки формы заявки через WhatsApp */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = contactForm.name.value;
  const device = contactForm.device.value;
  const issue = contactForm.issue.value;
  const phone = '79059877757'; // обновлённый номер телефона
  const message = `Заявка с сайта\nИмя: ${name}\nУстройство: ${device}\nПроблема: ${issue}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  modal.classList.remove('open');
  contactForm.reset();
});

/* Функционал калькулятора ремонта */
const calcBtn = document.getElementById('calcRepairBtn');
const repairCalcResult = document.getElementById('repairCalcResult');
const openModalFromCalc = document.getElementById('openModalFromCalc');

// Базовые цены для расчета (в рублях)
const basePrices = {
  "Apple": {
    "screen": 4000,
    "battery": 3500,
    "buttons": 3000,
    "water": 5000,
    "other": 2000
  },
  "Samsung": {
    "screen": 3500,
    "battery": 3000,
    "buttons": 2500,
    "water": 4500,
    "other": 1800
  },
  "Xiaomi": {
    "screen": 3000,
    "battery": 2500,
    "buttons": 2200,
    "water": 4000,
    "other": 1700
  },
  "Huawei": {
    "screen": 3200,
    "battery": 2800,
    "buttons": 2400,
    "water": 4200,
    "other": 1750
  },
  "OnePlus": {
    "screen": 3300,
    "battery": 2900,
    "buttons": 2500,
    "water": 4300,
    "other": 1800
  },
  "Google": {
    "screen": 3400,
    "battery": 3000,
    "buttons": 2600,
    "water": 4400,
    "other": 1850
  },
  "Sony": {
    "screen": 3600,
    "battery": 3100,
    "buttons": 2700,
    "water": 4600,
    "other": 1900
  },
  "Другое": {
    "screen": 3000,
    "battery": 2500,
    "buttons": 2200,
    "water": 4000,
    "other": 1800
  }
};

calcBtn.addEventListener('click', () => {
  const brand = document.getElementById('brand').value;
  const repairType = document.getElementById('repairType').value;
  if (!brand || !repairType) {
    repairCalcResult.textContent = "Пожалуйста, выберите бренд и тип ремонта.";
    return;
  }
  const price = basePrices[brand] && basePrices[brand][repairType] ? basePrices[brand][repairType] : 0;
  if (price > 0) {
    repairCalcResult.textContent = `Ориентировочная цена: от ${price} руб. (точная стоимость уточняется в сервисном центре)`;
  } else {
    repairCalcResult.textContent = "Для выбранного варианта цены нет. Уточните в сервисном центре.";
  }
});

// Открытие модального окна из калькулятора
openModalFromCalc.addEventListener('click', () => {
  modal.classList.add('open');
});

/* Плавное появление элементов при скролле (Intersection Observer) */
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
faders.forEach(el => observer.observe(el));

/* Эффект набора текста (typewriter) */
document.addEventListener('DOMContentLoaded', function() {
  const text = "Ремонт iPhone в Бийске";
  const typewriterEl = document.getElementById('typewriter');
  let index = 0;
  function type() {
    if (index < text.length) {
      typewriterEl.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 150);
    } else {
      setInterval(() => {
        typewriterEl.classList.toggle('blink');
      }, 500);
    }
  }
  type();
});

/* Инициализация Яндекс Карт с обновленным адресом */
if (typeof ymaps !== 'undefined') {
  ymaps.ready(initMap);
  function initMap(){
    var myMap = new ymaps.Map("yandexMap", {
        center: [52.539, 85.165], // Координаты Бийска (при необходимости обновите)
        zoom: 12,
        controls: ['zoomControl']
    });
    var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Apple Master',
        balloonContent: 'Бийск, ул. Ильи Мухачева 236 офис 5'
    }, {
        preset: 'islands#icon',
        iconColor: '#34A798'
    });
    myMap.geoObjects.add(myPlacemark);
  }
}

/* Модальное окно для развернутой статьи */
const articleModal = document.getElementById('article-modal');
const articleModalTitle = document.getElementById('article-modal-title');
const articleModalContent = document.getElementById('article-modal-content');
const articleModalClose = document.querySelector('.article-modal-close');

document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', function() {
    const title = this.getAttribute('data-title');
    const content = this.getAttribute('data-content');
    articleModalTitle.textContent = title;
    articleModalContent.textContent = content;
    articleModal.classList.add('open');
  });
});
articleModalClose.addEventListener('click', function() {
  articleModal.classList.remove('open');
});
window.addEventListener('click', function(e) {
  if (e.target === articleModal) {
    articleModal.classList.remove('open');
  }
});
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    articleModal.classList.remove('open');
  }
});

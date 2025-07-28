// === Theme Toggle ===
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// === Hamburger Menu ===
// const hamburger = document.getElementById("hamburger");
// const navMenu = document.getElementById("nav-menu");

// hamburger.addEventListener("click", () => {
//   navMenu.classList.toggle("active");
// });

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

// === Typed Text Animation ===
const typedText = document.getElementById("typed-text");
const phrases = ["Frontend Developer", "AI Website Builder", "Creative Web Designer"];
let index = 0;
let charIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function type() {
  if (index >= phrases.length) index = 0;
  currentPhrase = phrases[index];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedText.textContent = currentPhrase.substring(0, charIndex);

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

document.addEventListener("DOMContentLoaded", type);

// === Project Filter ===
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.getAttribute('data-category');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || category === cardCategory) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("send-btn");
  const spinner = document.getElementById("spinner");
  const popup = document.getElementById("success-popup");

  spinner.style.display = "inline-block";

  emailjs.sendForm('service_9g9567k', 'template_fu2fbap', this)
    .then(() => {
      spinner.style.display = "none";
      popup.style.display = "block";
      setTimeout(() => popup.style.display = "none", 3000); // hide after 3s
      this.reset();
    }, (error) => {
      spinner.style.display = "none";
      alert("❌ Failed to send message:\n" + JSON.stringify(error));
    });
});

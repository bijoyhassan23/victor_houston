// Language Selector
const dropdown = document.getElementById('langDropdown');
const selected = dropdown.querySelector('.lang-selected');
const code = dropdown.querySelector('.lang-code');
const img = dropdown.querySelector('.lang-selected img');

selected.onclick = () => dropdown.classList.toggle('open');

dropdown.querySelectorAll('.lang-option').forEach(option => {
  option.onclick = () => {
    code.textContent = option.dataset.lang;
    img.src = option.querySelector('img').src;
    dropdown.classList.remove('open');
  }
});

// Close on outside click
document.addEventListener('click', e => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});


// Testimonial slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots span');
let index = 0;
let autoPlayInterval;

function showSlide(i) {
  const currentSlide = document.querySelector('.slide.active');

  // Add prev-slide class to current slide
  if (currentSlide) {
    currentSlide.classList.add('prev-slide');
    currentSlide.classList.remove('active');
  }

  // Remove prev-slide from all slides after animation
  setTimeout(() => {
    slides.forEach(s => s.classList.remove('prev-slide'));
  }, 900);

  // Activate new slide
  slides[i].classList.add('active');

  // Update dots
  dots.forEach(d => d.classList.remove('active'));
  dots[i].classList.add('active');
}

document.querySelector('.next').onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
  resetAutoPlay();
};

document.querySelector('.prev').onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
  resetAutoPlay();
};

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    showSlide(i);
    resetAutoPlay();
  };
});

// Auto-play functionality
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 9000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Start auto-play on load
startAutoPlay();

// Pause on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopAutoPlay);
slider.addEventListener('mouseleave', startAutoPlay);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
    resetAutoPlay();
  } else if (e.key === 'ArrowRight') {
    index = (index + 1) % slides.length;
    showSlide(index);
    resetAutoPlay();
  }
});

// Nav

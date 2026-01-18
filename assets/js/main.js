
// nav toggle
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelector('.nav-items');

menuToggle.addEventListener('click', () => {
  navItems.classList.toggle('active');
  menuToggle.classList.toggle('active');
});


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
// language selector end


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

// end slider code 


// feature heading animate
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const headings = entry.target.querySelectorAll('.anim-head');
      headings.forEach((heading, i) => {
        setTimeout(() => {
          heading.classList.add('animate');
        }, i * 500)
      });
    }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector('#features'));

// service animate
const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const services = entry.target.querySelectorAll('.service-card');
      services.forEach((service, i) => {
        setTimeout(() => {
          service.style.animation = 'fadeRight 1.7s ease-in-out forwards';
        }, i * 500)
      })
    }
  })
}, { threshold: 0.3 });;
observer1.observe(document.querySelector('#services'));

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    fetch('http://send-email.local/wp-content/plugins/email/send-mail.php', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        formMessages.textContent = data;
        formMessages.style.color = 'green';
        formMessages.style.textAlign = 'center';
        formMessages.style.fontWeight = 'bolder';
        formMessages.style.paddingBottom = '15px';
        contactForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        formMessages.textContent = 'An error occurred while sending the message.';
        formMessages.style.color = 'red';
        formMessages.style.textAlign = 'center';
        formMessages.style.fontWeight = 'bold';
      });
  });
}


// Language Selector
const dropdown = document.getElementById('langDropdown');
const selected = dropdown.querySelector('.lang-selected');
const code = dropdown.querySelector('.lang-code');
const img = dropdown.querySelector('.lang-selected img');

selected.onclick = () => dropdown.classList.toggle('open');

dropdown.querySelectorAll('.lang-option').forEach(option=>{
  option.onclick = ()=>{
    code.textContent = option.dataset.lang;
    img.src = option.querySelector('img').src;
    dropdown.classList.remove('open');
  }
});

// Close on outside click
document.addEventListener('click', e=>{
  if(!dropdown.contains(e.target)){
    dropdown.classList.remove('open');
  }
});



// testimonial slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots span');
let index = 0;

function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
}

document.querySelector('.next').onclick = ()=>{
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.querySelector('.prev').onclick = ()=>{
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

dots.forEach((dot,i)=>{
  dot.onclick = ()=>{
    index = i;
    showSlide(i);
  };
});

// const slides = document.querySelector('.slides');
// const dots = document.querySelectorAll('.dots span');
// let index = 0;

// function showSlide(i){
//   slides.style.transform = `translateX(-${i * 100}%)`;

//   dots.forEach(d => d.classList.remove('active'));
//   dots[i].classList.add('active');
// }

// document.querySelector('.next').onclick = () => {
//   index = (index + 1) % dots.length;
//   showSlide(index);
// };

// document.querySelector('.prev').onclick = () => {
//   index = (index - 1 + dots.length) % dots.length;
//   showSlide(index);
// };

// dots.forEach((dot, i) => {
//   dot.onclick = () => {
//     index = i;
//     showSlide(i);
//   };
// });

// Nav

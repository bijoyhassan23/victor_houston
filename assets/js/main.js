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
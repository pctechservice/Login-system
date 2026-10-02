const menubtn = document.querySelector('#menubtn');
const menu = document.querySelector('.menu');

menubtn.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});
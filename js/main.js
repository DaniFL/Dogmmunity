const menu = document.querySelector('.menu');
const desplegable =document.querySelector('.menu_desplegable');

menu.addEventListener('click',()=>{
    menu.classList.toggle("active");
    desplegable.classList.toggle("click");
})
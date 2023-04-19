const btn = document.getElementsByTagName('button')[0];
const data = document.querySelector('.data');

btn.addEventListener('click', () => {
const error = () => {
  geo.textContent = 'Информация о местоположении недоступна';
}

const response = (position) => {                                    
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    geo.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}
data.innerHTML='';
let size = document.createElement('li');
let geo = document.createElement('li');
size.innerText=`Размеры экрана пользователя ширина: ${window.screen.width} x высота: ${window.screen.height}`;
data.appendChild(size);
data.appendChild(geo);

if (!navigator.geolocation) {
    geo.innerText='Информация о местоположении недоступна';
    } else {
    geo.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(response, error);
}
});
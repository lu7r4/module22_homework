const btn = document.getElementsByTagName('button')[0];
const data = document.querySelector('.data');

let url = 'https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=' 
let description

const error = () => {
    geo.textContent = 'Информация о местоположении недоступна';
} 
btn.addEventListener('click', () => {
    data.innerHTML='';
    let geo = document.createElement('div');
    data.appendChild(geo);
    let time = document.createElement('div');

const fetchRequest = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch {
        console.log('error');
    }
}

const get = async (position) => {                                   
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    description = url+latitude+'&long='+longitude;

    const requestResult = await fetchRequest(url);

    if (requestResult.length != 0) {
        geo.innerText = `временная зона, в которой находится пользователь: ${requestResult.timezone}`;
        time.innerText = `местные дата и время: ${requestResult.date_time_txt}`;
        data.appendChild(time);
    }
}

if (!navigator.geolocation) {
    geo.innerText='Информация о местоположении недоступна';
    } else {
        geo.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(get, error);
}

});
const wsUri = " wss://echo-ws-service.herokuapp.com";
const wrapperChat =  document.querySelector('#chat__wrap');
const input = document.querySelector('#input');
const mainButton = document.querySelector('#btn');
const btnGeo = document.querySelector('#geo');
const userMes = document.querySelector('#chat_user-messages');
const serverMessages = document.querySelector('#chat__server-messages');

// сообщения
function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='new_messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMes.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }

// сервер
 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};

  //отправка сообщения
    mainButton.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`Вы: ${message}`);
	input.value = ''
});

  //гео-локация.
  // ошибка при получениее геолокации
const error = () => {
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
};

  // получение геолокации
    const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
};

    btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	    console.log('Geolocation not working');
	} else {
	    navigator.geolocation.getCurrentPosition(success, error);
	}
  });

  // удаление сообщений
  serverMessages.addEventListener('click', () => {
	userMes.innerHTML = " ";
  });

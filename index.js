let arr = ['Амстердам','Андорра-ла-Велья','Афины','Белград','Берлин','Берн','Братислава',
'Брюссель','Будапешт','Бухарест','Вадуц','Валлетта','Варшава','Ватикан','Вена','Вильнюс',
'Дублин','Загреб','Киев','Кишинёв','Копенгаген','Лиссабон','Лондон','Любляна','Люксембург',
'Мадрид','Минск','Монако','Москва','Осло','Париж','Подгорица','Прага','Рейкьявик','Рига',
'Рим','Сан-Марино','Стокгольм','Таллин','Тирана','Хельсинки','Абу-Даби','Амман','Анкара',
'Ашхабад','Багдад','Баку','Бангкок','Бейрут','Бишкек','Дакка','Дамаск','Дели',
'Джакарта','Душанбе','Ереван','Иерусалим','Исламабад','Кабул','Катманду','Куала-Лумпур',
'Мале','Манама','Манила','Нур-Султан','Пекин','Пномпень','Сеул','Сингапур','Ташкент',
'Тбилиси','Тегеран','Токио','Улан-Батор','Ханой','Шри-Джаяварденепура-Котте','Эль-Кувейт',
'Абуджа','Аддис-Абеба','Бисау','Конго','Дакар','Джибути','Джуба','Додома','Каир','Кампала',
'Кигали','Монровия','Нуакшот','Порт-Луи','Прая','Рабат','Ливия','Уагадугу','Фритаун','Хараре',
'Ямусукро','Яунде','Асунсьон','Богота','Буэнос-Айрес','Гватемала','Каракас','Кастри',
'Кито','Манагуа','Мехико','Монтевидео','Оттава','Панама','Парамарибо','Розо','Сан-Сальвадор',
'Сан-Хосе','Канберра'];



input = document.querySelector('input');
input.addEventListener('input', addArrClick);
input.addEventListener('keydown', addArrEnter);
let arr1;
let i;


function addArrEnter(e){
    if(e.key === 'Enter'){
        let res = arr.map(item => item.trim().toLocaleLowerCase());
        arr1 = res.filter(item => item.startsWith(input.value));
        getItem();
        input.value = '';
    }
    if(e.key === 'Backspace'){
        document.querySelector('.out').classList.remove('none');
   }
}

function addArrClick(){
    let res = arr.map(item => item.trim().toLocaleLowerCase());
    arr1 = res.filter(item => item.startsWith(input.value));
    let out = '';
    arr1.forEach((item, index) => out += `<li onclick = getItem(${index})>${item}</li>`);
    document.querySelector('.card-container').innerHTML = '';
    document.querySelector('.out').innerHTML = out;
};

function getItem(index){
    
    arr1.length === 1 ? i = 0 : i = index;
    input.value = arr1[index];
    document.querySelector('.out').innerHTML = '';

    fetch('https:api.openweathermap.org/data/2.5/forecast?q='+`${arr1[i]}`+'&appid=3413a144cf4e2564ef32a27156ff77cf')
        .then(function(response){
            return response.json()
        })
        .then(function(data){  
           
            console.log(data)     
            let out = '';
            out += 
            `<div class = "card">
                <h2>${data.city.name}</h2>
                <h3>Temp: ${Math.round(data.list[0].main.temp - 273)} °C</h3>
                <span>Feels like: ${Math.round(data.list[0].main.feels_like - 273)} °C</span>
                <span>Max temp: ${Math.round(data.list[0].main.temp_max - 273)} °C</span>
                <span>Min temp: ${Math.round(data.list[0].main.temp_min - 273)} °C</span>
                <img src = "https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
                <span>Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString()}</span>
                <span>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}</span>
            </div>`;
            document.querySelector('.card-container').innerHTML = out;
            document.querySelector('.out').classList.add('none');
    });
};






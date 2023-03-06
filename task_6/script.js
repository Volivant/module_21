const btn = document.querySelector('.j-btn');

function insertAlert(message) {
    const divAlert = document.createElement('div');//создаем блок
    divAlert.className = 'alert';//добавляем класс
    const script = document.getElementsByTagName('script')[0];//получаем указатель на скрипт
    divAlert.innerHTML = message;
    document.body.insertBefore(divAlert,script);// вставляем блок перед скриптом
    setTimeout(() => divAlert.remove(), 1000);
};

function loadImg(urlRequest){
    fetch(urlRequest)
    .then((response) => {
      // Объект ответа на запрос
      //console.log('response', response);
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      const result = response.json();
      console.log('result', result);
      localStorage.setItem('urlRequest', urlRequest);// запишем удачный url
      return result;
    })
    .then((data) => {
      // Объект результата в формате JSON
      console.log(data);

      if (data.length) {
        let imgList = document.querySelector('.img-list'); // находим старый блок
        if (imgList) imgList.remove(); // удаляем старый блок, если нашли
        imgList = document.createElement('ul');//создаем блок
        imgList.className = 'img-list';//добавляем класс
        //console.log(data.length);
        const script = document.getElementsByTagName('script')[0];//получаем указатель на скрипт
        document.body.insertBefore(imgList,script);// вставляем блок перед скриптом
        for (let i = 0; i < data.length; i++) {
          const imgListItem = document.createElement('li');// создаем элемент списка
          const imgItem = document.createElement('img');// создаем элемент картинку
          imgItem.className = 'img-list__item';
          imgList.append(imgListItem);// добавляем элемент списка на страницу
          imgItem.src = data[i].download_url; // добавляем url картинки
          imgListItem.append(imgItem);// добавляем элемент картинку
        }
      }
    })
    .catch(() => { console.log('error') });
}

btn.addEventListener('click', () => {
    //Получаем номер страницы
    const pageNumber = Number(document.querySelector('.page-input').value);
    //Получаем лимит
    const limitNumber = Number(document.querySelector('.limit-input').value);
    let conditionPage = false; // Флаг соблюдения условий ввода страницы
    let conditionLimit = false; // Флаг соблюдения условий ввода лимита
    // Проверка ввода
    (!Number.isInteger(pageNumber)||pageNumber<1||pageNumber>10) ? conditionPage = false : conditionPage = true;
    (!Number.isInteger(limitNumber)||limitNumber<1||limitNumber>10) ? conditionLimit = false : conditionLimit = true;
    if (!conditionPage && conditionLimit) {
        insertAlert('Номер страницы вне диапазона от 1 до 10');
    } else if (conditionPage && !conditionLimit) {
        insertAlert('Лимит вне диапазона от 1 до 10');
    } else if (!conditionPage && !conditionLimit) {
        insertAlert('Номер страницы и лимит вне диапазона от 1 до 10');
    } else {
        // Делаем запрос данных
        loadImg(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitNumber}`);
    }
});

window.onload = function() {
  let urlRequest = localStorage.getItem('urlRequest');// читаем последний url
  if (urlRequest) loadImg(urlRequest);
};

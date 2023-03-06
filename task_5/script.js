const btn = document.querySelector('.j-btn');


btn.addEventListener('click', () => {
  //Получаем ID
  const userId = document.querySelector('.input-user-input').value;
  // Делаем запрос данных
  //fetch('https://jsonplaceholder.typicode.com/users/3/todos')
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
    .then((response) => {
      // Объект ответа на запрос
      console.log('response', response);
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      const result = response.json();
      console.log('result', result);
      return result;
    })
    .then((data) => {
      // Объект результата в формате JSON
      if (data.length) {
        console.log(data);
        const taskList = document.createElement('ul');//создаем блок
        taskList.classList.add('user-task');//добавляем класс
        const script = document.getElementsByTagName('script')[0];//получаем указатель на скрипт
        document.body.insertBefore(taskList,script);// вставляем блок перед скриптом
        console.log(data.length);


        for (let i = 0; i < data.length; i++) {
          const task = document.createElement('li');// создаем элемент списка
          task.textContent = data[i].title; // добавляем содержимое элемента
          (data[i].completed) ? task.className = 'user-task__item' : 
            task.className = 'user-task__item--complit';//добавляем класс
          taskList.append(task);// добавляем элемент списка на страницу
        }
      } else {
        alert('Пользователь с указанным id не найден');
      }
    })
    .catch(() => { console.log('error') });
});


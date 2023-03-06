// функция генерации случаййного числа
let randomIntNumber = (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

function usePromise(number) {
    // Создаем promise
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        (number % 2 == 0) ? resolve("Успешное выполнение promise") : reject("Promise завершился ошибкой");
      }, 3000);
    });
  
    // Выполняем promise
    myPromise
      .then((result) => {
        console.log(`Завершено успешно. Сгенерированное число — ${number}`, result);
      })
      .catch((error) => {
        console.log(`Завершено с ошибкой. Сгенерированное число — ${number}`, error);
      });
  };

window.onload = function() {
    usePromise(randomIntNumber(100, 1));
    
};

function setLocalStorage(userName, lastDate){
    localStorage.setItem('userName', userName);
    lastDate = new Date();
    localStorage.setItem('lastDate', lastDate);
};

window.onload = function() {
    let lastDate = new Date(localStorage.getItem('lastDate'));
    let userName = localStorage.getItem('userName');
    if (userName) {
        alert('Добрый день, ' + userName + '! Давно не виделись. В последний раз вы были у нас ' + 
        lastDate.getDate() + '.' + lastDate.getMonth() + '.' + lastDate.getFullYear() + '  в ' +  
        lastDate.getHours() + ' часов ' +  lastDate.getMinutes() + ' минут.');
        setLocalStorage(userName, lastDate)
    } else {
        userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя', 'User');
        setLocalStorage(userName, lastDate)
    }
};

function clearLocalStorage(){
    localStorage.clear();
};
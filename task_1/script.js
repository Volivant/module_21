/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser.
const parser = new DOMParser();
// console.log('parser', parser);

// XML, который мы будем парсить
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;
//console.log('xmlString', xmlString);

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDOM.documentElement;
//console.log('listNode', listNode);
//console.log('длина', listNode.childElementCount);// кол-во элементов

/* Этап 3. Запись данных в результирующий объект */
//Объявляем js-объект с требуемой структурой
let result = {
    list: [
        {
            name: '',
            age: '',
            prof: '',
            lang: '',
        },
        {
            name: '',
            age: '',
            prof: '',
            lang: '',
        }
    ]
};


for (let i = 0; i < listNode.childElementCount; i++) {
    const studentNode = listNode.querySelectorAll("student")[i];
    const nameNode = studentNode.querySelector("name");
    const firstNameNode = nameNode.querySelector("first");
    const secondNameNode = nameNode.querySelector("second");
    const ageNode = studentNode.querySelector("age");
    const profNode = studentNode.querySelector("prof");
    const langAttr = nameNode.getAttribute('lang');
    result.list[i].name = firstNameNode.textContent + ' ' + secondNameNode.textContent;
    result.list[i].age = Number(ageNode.textContent);
    result.list[i].prof = profNode.textContent;
    result.list[i].lang = langAttr;
}

console.log('JS-объект', result);
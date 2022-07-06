// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
// Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';


// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message,
// в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".

const formEl = document.querySelector(".feedback-form");
const inputEl = document.querySelector(".feedback-form input")

let formData = JSON.parse(localStorage.getItem("feedback-form-state")) || {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

savedData();

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы.
// В противном случае поля должны быть пустыми.

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}

function savedData() {
    const saveInfo = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (saveInfo) {
        formEl.elements.email.value = saveInfo.email || "";
        formEl.elements.message.value = saveInfo.message || "";

}
};

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их 
// значениями в консоль.
function onFormSubmit(event) {
    event.preventDefault();
    if (formEl.elements.email.value === "" || formEl.elements.message.value === "") {
        return alert("Please fill in all the fields!");
    }

    else{
    event.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    console.log(formData);
    }
}

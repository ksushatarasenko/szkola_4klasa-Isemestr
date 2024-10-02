function toggleAnswer(number) {
    event.preventDefault();
    var answer = document.getElementById('answer' + number);
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
}


function checkAnswers() {
    event.preventDefault();
    const form = document.getElementById('quiz-form');
    const questions = form.getElementsByClassName('question');
    let score = 0;
    let total = questions.length;

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const correctAnswer = question.getAttribute('data-correct');
        const selectedAnswer = form[`q${i + 1}`].value;
        const resultElement = document.getElementById(`q${i + 1}-result`);

        if (selectedAnswer === correctAnswer) {
            score++;
            resultElement.innerHTML = "Правильно! <img src='https://i.pinimg.com/564x/0b/5d/1f/0b5d1f62c0c6ddaa2c9c465264c5343c.jpg' alt='Correct Smiley' width='60' height='60' />";
            resultElement.className = 'marker correct';
            } else {
            resultElement.innerHTML = "Неправильно! <img src='https://i.pinimg.com/564x/12/7a/db/127adb0185cb2c9c8abac2f28966bb97.jpg' alt='Incorrect Smiley' width='60' height='60' />";
            resultElement.className = 'marker incorrect';
        }

    }

    const result = document.getElementById('result');
    result.textContent = `Ви відповіли правильно на ${score} з ${total} питань.`;
    if (score === total) {
        result.className = 'correct';
    } else {
        result.className = 'incorrect';
    }
}

// -------------- выбор несколько ответов

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

function checkAnswersLabel(formId, resultId) {
    const form = document.getElementById(formId);
    const questions = form.getElementsByClassName('question');
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const correctAnswers = question.getAttribute('data-correct').split(',');
        const selectedAnswers = Array.from(form.querySelectorAll(`input[name="q${i + 1}"]:checked`)).map(el => el.value);
        
        const resultElement = document.getElementById(resultId);

        if (arraysEqual(selectedAnswers, correctAnswers)) {
            score++;
            resultElement.innerHTML = "Правильно! <img src='https://i.pinimg.com/564x/0b/5d/1f/0b5d1f62c0c6ddaa2c9c465264c5343c.jpg' alt='Correct Smiley' width='60' height='60' />";
        } else {
            resultElement.innerHTML = "Неправильно! <img src='https://i.pinimg.com/564x/12/7a/db/127adb0185cb2c9c8abac2f28966bb97.jpg' alt='Incorrect Smiley' width='60' height='60' />";
        }
    }
}

// ----------------------------
function checkAnswersTrue(setId, smileId) {
    const set = document.getElementById(setId);
    const inputs = set.querySelectorAll('input[data-answer]');

    let correctAnswers = [];
    let userAnswers = [];

    inputs.forEach(input => {
        const correctAnswer = removeSpaces(input.getAttribute('data-answer').trim());
        const userAnswer = removeSpaces(input.value.trim());

        // Игнорируем пустые data-answer
        if (correctAnswer === '') {
            return; // Пропускаем проверку этого поля
        }

        correctAnswers.push(correctAnswer);
        userAnswers.push(userAnswer);

        // Проверка для символов (*, +, :, -, <, >, =) и чисел
        if (isSpecialSymbol(correctAnswer) && correctAnswer === userAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } 
        // Сравнение как чисел, если это не символы
        else if (userAnswer !== '' && parseFloat(userAnswer) == parseFloat(correctAnswer)) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });

    const allCorrect = arraysEqual(userAnswers, correctAnswers);

    // Отображение результата с учетом правильности ответов
    const resultElement = document.getElementById(smileId);
    if (allCorrect) {
        resultElement.innerHTML = "<img src='https://i.pinimg.com/564x/0b/5d/1f/0b5d1f62c0c6ddaa2c9c465264c5343c.jpg' alt='Correct Smiley' width='60' height='60' />";
    } else {
        resultElement.innerHTML = "<img src='https://i.pinimg.com/564x/12/7a/db/127adb0185cb2c9c8abac2f28966bb97.jpg' alt='Incorrect Smiley' width='60' height='60' />";
    }
}

// Функция для проверки специальных символов
function isSpecialSymbol(value) {
    return ['*', '+', ':', '-', '<', '>', '=', '.'].includes(value);
}

// Функция для сравнения массивов
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        // Для символов проверяем точное совпадение строк
        if (isSpecialSymbol(arr1[i]) && arr1[i] === arr2[i]) {
            continue;
        }
        // Для чисел сравниваем как числа
        if (parseFloat(arr1[i]) !== parseFloat(arr2[i])) return false;
    }
    return true;
}

// Функция для удаления всех пробелов из строки
function removeSpaces(value) {
    return value.replace(/\s+/g, '');
}




// ------------------
// кнопка для подсказки
function toggleHints(hintsId) {
    var hints = document.getElementById(hintsId);
    if (hints.style.display === "none") {
        hints.style.display = "block";
    } else {
        hints.style.display = "none";
    }
}

//-------------- pidkazkaOptima

function toggleHint2(element) {
    element.classList.toggle('active');
}

// ------- Выбор ответа с выпадающего списка  -----

function checkAnswersSelect(button) {
    // Найдем контейнер, который содержит текущую кнопку
    const container = button.closest('.select-container');
    
    // Получим все select элементы внутри этого контейнера
    const selects = container.querySelectorAll('select');
    
    let allCorrect = true;
    
    selects.forEach(select => {
        const correctAnswer = select.getAttribute('data-answer');
        const selectedAnswer = select.value;

        if (selectedAnswer === correctAnswer) {
            select.classList.add('correct');
            select.classList.remove('incorrect');
        } else {
            select.classList.add('incorrect');
            select.classList.remove('correct');
            allCorrect = false;
        }
    });

    
}

//  ---------- end Выбор ответа с выпадающего списка --------------


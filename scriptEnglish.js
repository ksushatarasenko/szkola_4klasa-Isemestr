function toggleHint2(element) {
    element.classList.toggle('active');
}

// Скрипт для воспроизведения звука при нажатии на картинку

document.querySelectorAll('.play-sound').forEach(function(image) {
    image.addEventListener('click', function() {
        // Получаем ID аудио из data-атрибута
        var audioId = this.getAttribute('data-audio');
        var audio = document.getElementById(audioId);

        // Если аудио уже воспроизводится - ставим паузу
        if (!audio.paused && !audio.ended) {
            audio.pause();
        } else {
            // Если аудио окончено, запускаем его с начала
            if (audio.ended) {
                audio.currentTime = 0; // Начало с начала, если завершилось
            }
            audio.play();  // Воспроизведение звука
        }
    });
});

// -----------------------------------------
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
function isSpecialSymbol(str) {
    const specialSymbols = ['*', '+', ':', '-', '<', '>', '=', '.', "'"];
    
    // Проходим по каждому символу строки
    for (let char of str) {
        if (specialSymbols.includes(char)) {
            return true; // Если найден спецсимвол, возвращаем true
        }
    }
    
    return false; // Если спецсимволов нет, возвращаем false
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


// -----------
function checkAnswers(setId) {
    const set = document.getElementById(setId);
    const inputs = set.querySelectorAll('input[data-answer]');
    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
}


function toggleAnswer(number) {
    var answer = document.getElementById('answer' + number);
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
}

// 
// Необходим скрипт, если вы хотите увеличить картинку при клике вместо наведения
document.addEventListener('DOMContentLoaded', function () {
    var zoomableImages = document.querySelectorAll('.zoomable');

    zoomableImages.forEach(function (img) {
        img.addEventListener('click', function () {
            this.classList.toggle('zoomed');
        });
    });
});


// Скрипт для воспроизведения звука при нажатии на картинку
// Функция для воспроизведения звука
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
// 
// функция кнопки ответ

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

// кнопка для подсказки
function toggleHints(hintsId) {
    var hints = document.getElementById(hintsId);
    if (hints.style.display === "none") {
        hints.style.display = "block";
    } else {
        hints.style.display = "none";
    }
}
// Функция для проверки ответов и подсчета баллов
let totalScore = 0;
function checkAnswersBal(setId) {
    const set = document.getElementById(setId);
    const inputs = set.querySelectorAll('input[data-answer]');
    let score = 0;  // Баллы за это задание

    inputs.forEach(input => {
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            score += 1;  // Добавляем 1 балл за правильный ответ
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });

    // Обновляем общий счет по мере прохождения
    totalScore += score;

    // Выводим результат под текущим заданием
    const resultElement = document.getElementById('result-' + setId);
    resultElement.innerHTML = `Ваш результат за это задание: ${score} из ${inputs.length}`;
}

// Функция для подсчета и вывода общего результата по всем заданиям
function checkTotalScore() {
    // По вашему запросу, эта функция должна выполняться только после всех проверок
    const totalResultElement = document.getElementById('total-result');
    totalResultElement.innerHTML = `Общий результат по всем заданиям: ${totalScore}`;
}
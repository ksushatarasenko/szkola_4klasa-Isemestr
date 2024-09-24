function toggleAnswer(number) {
    var answer = document.getElementById('answer' + number);
    if (answer.style.display === 'none' || answer.style.display === '') {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
}

// контрольні питання (питання + варіанти відповіді = кнопка перевірити)
function checkAnswers() {
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
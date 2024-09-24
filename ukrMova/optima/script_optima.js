function checkAnswers() {
    const correctAnswers = {
        q1: "799",
        q2: "50",
        q3: "205",
        q4: "90"
    };

    let correctCount = 0;
    for (let [question, answer] of Object.entries(correctAnswers)) {
        const selectedAnswer = document.getElementById(question).value;
        if (selectedAnswer === answer) {
            correctCount++;
        }
    }

    alert(`Вы правильно ответили на ${correctCount} из 4 вопросов.`);
}
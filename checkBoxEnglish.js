// script checkBox

function checkCheckbox(taskId) {
    const correctAnswers = {
        taskUnit2SmartKids: {
            question1: ['1'], 
            question2: ['1'],
            question4: ['1'], 
        }
    };

    let allCorrect = true;

    if (correctAnswers[taskId]) {
        const answers = correctAnswers[taskId];

        for (const [question, correctValues] of Object.entries(answers)) {
            const selectedAnswers = document.querySelectorAll(`#${taskId} input[name="${question}"]:checked`);
            const selectedValues = Array.from(selectedAnswers).map(input => input.value);
            const taskElement = document.querySelector(`#${taskId} .task:has(input[name="${question}"])`);

            // Проверка на совпадение выбранных значений с правильными
            if (selectedValues.length === correctValues.length && selectedValues.every(val => correctValues.includes(val))) {
                taskElement.classList.add('correct');
                taskElement.classList.remove('incorrect');
            } else {
                taskElement.classList.add('incorrect');
                taskElement.classList.remove('correct');
                allCorrect = false;
            }
        }
    } else {
        console.error(`No correct answers provided for task id: ${taskId}`);
        return;
    }

   
}

document.getElementById('checkCheckbox').addEventListener('click', function() {
    checkCheckbox('taskId');
});

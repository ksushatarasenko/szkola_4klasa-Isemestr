document.addEventListener('DOMContentLoaded', (event) => {
    // Обработчик для выделения выбранного ответа
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const options = question.querySelectorAll('.option');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
    });

    // Обработчик для проверки ответов
    const checkButton = document.querySelector('#checkAnswers'); // Изменено на querySelector

    checkButton.addEventListener('click', () => {
        const questions = document.querySelectorAll('.question'); // Изменено на выбор всех вопросов

        questions.forEach(question => {
            const correctIndex = question.getAttribute('data-correct');
            const options = question.querySelectorAll('.option');

            options.forEach((option, index) => {
                option.classList.remove('correct', 'incorrect');
                if (option.classList.contains('selected')) {
                    if (index == correctIndex) {
                        option.classList.add('correct');  // Подсвечиваем выбранный правильный ответ зеленым
                    } else {
                        option.classList.add('incorrect');  // Подсвечиваем выбранный неправильный ответ красным
                    }
                }
            });
        });
    });
});














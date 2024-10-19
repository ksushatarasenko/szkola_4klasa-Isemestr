

// Функция для сохранения состояния чекбоксов
async function saveCheckboxState(lessonId, isChecked, userId) {
    const response = await fetch(`https://my-checkbox-sync-project.onrender.com/api/save-checkbox-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lessonId, isChecked, userId })
    });

    if (response.ok) {
        console.log('Состояние сохранено');
    } else {
        console.error('Ошибка сохранения состояния');
    }
}

// 
async function getCheckboxState(userId) {
    const response = await fetch(`https://my-checkbox-sync-project.onrender.com/api/checkbox-state/${userId}`);
    const states = await response.json();
    states.forEach(state => {
        const checkbox = document.getElementById(state.lessonId);
        if (checkbox) {
            checkbox.checked = state.isChecked;
        }
    });
}

// Вызовите эту функцию при загрузке страницы
window.onload = () => {
    getCheckboxState('user123'); // Замените на реальный userId
};

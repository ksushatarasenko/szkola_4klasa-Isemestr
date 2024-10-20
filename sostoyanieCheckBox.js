async function markLessonComplete(lessonId, userId) {
    try {
        await fetch(`https://szkola-4klasa-isemestr.onrender.com/api/save-checkbox-state`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lessonId: lessonId,
                isChecked: true,  // Урок отмечен как пройденный
                userId: userId
            })
        });
        alert("Урок отмечен как пройденный!");
    } catch (error) {
        console.error("Ошибка при сохранении состояния урока:", error);
        alert("Не удалось сохранить состояние урока.");
    }
}


async function handleCheckboxChange(lessonId, isChecked, userId) {
    try {
        await saveCheckboxState(lessonId, isChecked, userId);
        console.log(`Состояние для урока ${lessonId} сохранено: ${isChecked}`);
    } catch (error) {
        console.error('Ошибка при сохранении состояния чекбокса:', error);
    }
}


// Функция для сохранения состояния чекбоксов
async function saveCheckboxState(lessonId, isChecked, userId) {
    const response = await fetch(`https://szkola-4klasa-isemestr.onrender.com/api/save-checkbox-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lessonId, isChecked, userId})
    });

    if (response.ok) {
        console.log('Состояние сохранено');
    } else {
        const errorText = await response.text();
        console.error('Ошибка сохранения состояния', response.status, errorText);
    }
}


// 
async function getCheckboxState(userId) {
    const response = await fetch(`https://szkola-4klasa-isemestr.onrender.com/api/checkbox-state/${userId}`);

    if (!response.ok) {
        console.error('Ошибка при получении состояния чекбоксов:', response.statusText);
        return;
    }

    const states = await response.json();
    states.forEach(state => {
        const checkbox = document.getElementById(state.lessonId);
        if (checkbox) {
            checkbox.checked = state.isChecked;
        }
    });
}


// Вызовите эту функцию при загрузке страницы
// window.onload = () => {
//     getCheckboxState('userEnglish'); // Замените на реальный userId
// };

window.onload = () => {
    const userIds = ['userEnglish', 'userMath', 'userScience', 'userHistory', 'userGeography', 'userArt'];
    
    userIds.forEach(userId => {
        getCheckboxState(userId);
    });
};

let draggedItem = null;

// Добавляем события для всех перетаскиваемых элементов
document.querySelectorAll('.draggable-item').forEach(item => {
  item.addEventListener('dragstart', () => {
    draggedItem = item;
    setTimeout(() => {
      item.classList.add('dragging');
    }, 0);
  });

  item.addEventListener('dragend', () => {
    setTimeout(() => {
      item.classList.remove('dragging');
      draggedItem = null;
    }, 0);
  });
});

// Добавляем события для каждой колонки
document.querySelectorAll('.sortable-column').forEach(column => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(column, e.clientY);
    if (afterElement == null) {
      column.appendChild(draggedItem);
    } else {
      column.insertBefore(draggedItem, afterElement);
    }
  });
});

// Функция для определения позиции вставки
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Функция для проверки правильного порядка в каждой колонке и подсветки
function checkOrder(setId) {
  const set = document.getElementById(setId);

  // Определяем правильный порядок для каждой колонки
  const correctOrder = ['1', '2', '3'];  // Правильный порядок по data-id

  let score = 0;
  let totalItems = 0;

  // Проверяем каждую колонку
  ['column-1', 'column-2', 'column-3'].forEach(columnId => {
    const column = document.getElementById(columnId);
    const items = column.querySelectorAll('.draggable-item');

    items.forEach((item, index) => {
      totalItems++;

      // Сначала убираем все подсветки
      item.classList.remove('corrects', 'incorrects');

      // Если элемент стоит на правильной позиции
      if (item.getAttribute('data-id') === correctOrder[index]) {
        score++;
        item.classList.add('corrects'); // Правильный ответ — зелёный
      } else {
        item.classList.add('incorrects'); // Неправильный ответ — красный
      }
    });
  });

  // Выводим результат
  const resultElement = document.getElementById('result-' + setId);
  if (score === totalItems) {
    resultElement.innerHTML = 'Все правильно!';
  } else {
    resultElement.innerHTML = `Есть ошибки. Вы правильно расположили ${score} из ${totalItems} элементов.`;
  }
}

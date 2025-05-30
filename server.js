const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Создаем сервер
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB (вставьте сюда свою строку подключения)
mongoose.connect('mongodb+srv://ksushatarasenko:ot3Xr63tpOrVvPs5@cluster0.nqqme.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// Схема и модель для сохранения состояния чекбоксов
const CheckboxStateSchema = new mongoose.Schema({
    lessonId: String,
    isChecked: Boolean,
    userId: String
  }, { versionKey: false });  // Отключаем поле __v

const CheckboxState = mongoose.model('CheckboxState', CheckboxStateSchema);

// API для получения состояния чекбоксов
// app.get('/api/checkbox-state/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     const states = await CheckboxState.find({ userId });
//     res.json(states);
// });

// API для получения состояния чекбоксов
app.get('/api/checkbox-state/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('Получен запрос на получение данных для:', userId);

    try {
        const states = await CheckboxState.find({userId});
        console.log('Найдены состояния:', states);
        if (states.length === 0) {
            console.log('Данные не найдены для userId:', userId);
            return res.status(404).json({ message: 'Данные не найдены' });
        }
        res.json(states);
    } catch (error) {
        console.error('Ошибка при получении состояния:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});




// API для сохранения состояния чекбоксов
app.post('/api/save-checkbox-state', async (req, res) => {
    const { lessonId, isChecked, userId } = req.body;
    const existingState = await CheckboxState.findOne({ lessonId, userId });

    if (existingState) {
        existingState.isChecked = isChecked;
        await existingState.save();
    } else {
        const newState = new CheckboxState({ lessonId, isChecked, userId });
        await newState.save();
    }

    res.sendStatus(200);
});



// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// ksushatarasenko
// ot3Xr63tpOrVvPs5
// https://szkola-4klasa-isemestr.onrender.com/
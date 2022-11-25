const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // створюємо файл(.env) і встановлюємо бібліотеку (dotenv)

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/config');

const app = express();

app.use(express.json()); // допомагає зчитувати json
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter); // початковий шлях ('/auth')
app.use('/users', userRouter); // початковий шлях ('/users')

// -- get - метод, який використовується для отримання!!!
// -- post - метод, який використовується для створення!!!
// -- put/patch - метод, який використовується для оновлення(update)!!!
// -- delete - метод, який використовується для видалення!!!

// - end point приклад ('./users') записаний після методу;
//-- req - це запит, який нам присилає клієнт (приклад: /users);
//-- res - це відповідь, яку ми відаємо на зовні (два res бути не може!!!);
//-- res.end - це кінцева відповідь, приймає лише стрічки('string');
//-- res.status - можна у Network глянуть статус кода який ви йому задали (code:401);
//-- res.sendFile('./') - посилає файл вказаний по шляху у дужках;
//-- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status -- сайт статусів для HTML;

app.get('/', (req, res) => {
    res.json('WElCOME');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500,
    });
});

// підняття серверу на певному порті (process.env.PORT), ще кажуть слухає порт!!!
app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen ${configs.PORT}`);
});






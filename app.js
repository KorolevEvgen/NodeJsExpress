// Express - це мінімалістичний та гнучкий веб-фреймворк для програм Node.js,
// що надає широкий набір функцій для мобільних та веб-додатків.

const express = require('express');

const userDb = require('./dataBase/users');

const app = express();

app.use(express.json()); // допомагає зчитувати json
app.use(express.urlencoded({ extended: true }));

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

app.get('/users', (req, res) => {
    console.log('USERS ENDPOINT');
    // res.json({user: 'Evgen'});
    // res.end('Life is good');
    // res.sendFile('./')
    // res.status(401).json('Life is good');
    res.json(userDb);
});

app.get('/users/:userId', (req, res) => {
    console.log(req.params);

    const { userId } = req.params;

    res.json(userDb[userId]);
});

app.post('/users', (req, res) => {
    const userInfo = req.body;

    console.log(userInfo);

    userDb.push(userInfo);

    res.status(201).json('Created');
});

app.put('/users/:userId', (req, res) => {
    const newUserInfo = req.body;
    const userId = req.params.userId;

    userDb[userId] = newUserInfo;

    res.json('Updated');
});

// підняття серверу на певному порті ('5000'), ще кажуть слухає порт!!!
app.listen(5000, () => {
    console.log('Server listen 5000');
});






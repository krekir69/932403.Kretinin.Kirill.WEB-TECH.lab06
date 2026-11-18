const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let tasks = [];
let currentId = 1;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/tasks', (req, res) => {
    const { completed } = req.query;
    let result = tasks;

    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        result = tasks.filter(task => task.completed === isCompleted);
    }

    res.json(result);
});

app.post('/api/tasks', (req, res) => {
    const { title, completed } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: currentId++,
        title: title.trim(),
        completed: completed === true ? true : false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Ошибка запуска:', err.message);
    } else {
        console.log('Server started on port ' + PORT);
    }
});
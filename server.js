const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT_LOGIN = 8085;
const PORT_QUIZ = 8081;
const PORT_SUBMIT = 8089;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      res.json({
        success: true,
        message: 'Login successful!',
        redirect: 'public/quiz.html', // Provide the quiz page URL
      });
    } else {
      res.json({ success: false, message: 'Invalid username or password!' });
    }
  });
  

// Quiz questions endpoint
app.get('/questions', (req, res) => {
  const questions = [
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'] },
    { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'] },
    { question: 'What is 5 * 6?', options: ['30', '25', '20', '35'] },
    { question: 'Which is a programming language?', options: ['HTML', 'CSS', 'Python', 'XML'] },
    { question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C', '120°C'] },
  ];
  res.json(questions);
});

// Quiz submission endpoint
app.post('/submit', (req, res) => {
  console.log('User submitted answers:', req.body);
  res.json({ message: 'Your answers have been submitted!' });
});

// Start servers
app.listen(PORT_LOGIN, () => console.log(`Login server running on http://localhost:${PORT_LOGIN}`));
app.listen(PORT_QUIZ, () => console.log(`Quiz server running on http://localhost:${PORT_QUIZ}`));
app.listen(PORT_SUBMIT, () => console.log(`Submit server running on http://localhost:${PORT_SUBMIT}`));

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: '',
    resave: false,
    saveUninitialized: true,
  })
);

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});


app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

app.get('/admin/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});

app.get('/admin/contact-submissions', (req, res) => {
  res.send('Admin Contact Submissions');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

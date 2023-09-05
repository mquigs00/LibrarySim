const express = require('express');

const home = require('./routes/home');
const login = require('./routes/login');
const authors = require('./routes/authors');
const publishers = require('./routes/publishers');
const subjects = require('./routes/subjects');
const books = require('./routes/books');
const users = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/login', login);
app.use('/authors', authors);
app.use('/publishers', publishers);
app.use('/subjects', subjects);
app.use('/books', books);
app.use('/users', users);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
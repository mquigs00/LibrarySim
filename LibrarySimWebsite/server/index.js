const path = require('path');
const express = require('express');

const home = require('./routes/home');
const login = require('./routes/login');
const authors = require('./routes/authors');
const publishers = require('./routes/publishers');
const subjects = require('./routes/subjects');
const books = require('./routes/books');
const users = require('./routes/users');
const myaccount = require('./routes/myaccount');
const searchItems = require('./routes/search-items');
const aboutUs = require('./routes/about-us');
const calendar = require('./routes/calendar');
const contactUs = require('./routes/contact-us');
const libraryCard = require('./routes/library-card');
const policies = require('./routes/policies');
const technologyInLibrary = require('./routes/technology-in-library');

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
app.use('/myaccount', myaccount);
app.use('/search-items', searchItems);
app.use('/about-us', aboutUs);
app.use('/calendar', calendar);
app.use('/contact-us', contactUs);
app.use('/library-card', libraryCard);
app.use('/policies', policies);
app.use('/technology-in-library', technologyInLibrary);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
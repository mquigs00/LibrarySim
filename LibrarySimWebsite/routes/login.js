const path = require('path');
const connection = require('./database')
const express = require('express');
const router = express.Router();

/**
 * Generates a random account number with a given length
 * 
 * I am not good at coming up with these kind of algorithms so I got it from this website
 * https://singhak.in/create-n-length-random-number-in-javascript/
 * 
 * @param {int} length the length of the users account number
 * @returns random account number of given length
 */
function generateAccountNum(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

/**
 * Determine if the new user data is fit to be entered to the user database.
 * 
 * @param {JSON} registerData - a JSON with all of the user attributes to be loaded
 * @returns isValid - whether or not the username and passwords are valid
 */
function validateNewUser(registerData) {
    let isValid = true;
    let username = registerData.username;
    let password = registerData.password;
    let password_conf = registerData.password_conf;

    console.log('Username in validateNewUser: ' + username);

    // check the database to see if the username is already taken
    let usernameExists = 'SELECT COUNT(Username) FROM users WHERE Username=?';
    connection.query(usernameExists, [username], (err, result) => {
        if(err) throw err;
        if (result[0]["COUNT(Username)"] > 0) {
            console.log('Username already taken!');
            isValid = false;
        };
    });

    // check the database to see if the password is already taken
    let passwordExists = 'SELECT COUNT(Password) FROM users WHERE Password=?';
    connection.query(passwordExists, [password], (err, result) => {
        if(err) throw err;
        if (result[0]["COUNT(Password)"] > 0) {
            console.log('Password already taken!');
            isValid = false;
        };
    });

    if (password != password_conf) {
        console.log('Passwords must match!')
        isValid = false;
    }

    return isValid;
}

/**
 * Load the validated user data to the users table
 * 
 * @param {JSON} registerData - the validated data entered by the user for registration
 */
function registerUser(registerData) {
    let accountNum = generateAccountNum(14);

    // create sql statement
    let insertStatement = 
    `INSERT INTO users (AccountNum, Username, Password, FirstName, LastName, DOB, Address, City, State, Zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    console.log('Username in registerUser: ' + registerData.username);
    // order out variables with the sql values
    var items = [accountNum, registerData.username, registerData.password, registerData.first_name, registerData.last_name, registerData.birthday, registerData.address, registerData.city, registerData.state, registerData.zipcode];

    connection.query(insertStatement, items, (err, results, fields) => {
        if (err) {
            console.log(err.message);
        }
    });
}


router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/html/login.html'));
});


router.post('/', (req, res) => {
    registerData = req.body;
    console.log('Calling register form from login.js!');
    console.log(registerData);
    validateNewUser(registerData);
    console.log('User data is valid');
    registerUser(registerData);
});

  
module.exports = router;
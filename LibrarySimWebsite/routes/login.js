const path = require('path');
const connection = require('./database')
const express = require('express');
const { log } = require('console');
const router = express.Router();

/**
 * Check how many instances of the given username appear in the users database
 * 
 * @param {VARCHAR} username 
 * @return {int} the number of appearances of the username
 */
function numUsernameAppearances(username) {
    let usernameExists = 'SELECT COUNT(Username) FROM users WHERE Username=?';

    return new Promise((resolve, reject) => {
        connection.query(usernameExists, [username], (err, result) => {
            if(err) reject(err);
            let numAppearances = result[0]["COUNT(Username)"];
            console.log('Num username appearances = ' + numAppearances);
            resolve(numAppearances);
        });
    });
}

/**
 * Check how many instances of the given password appear in the user database
 * 
 * @param {VARCHAR} password
 * @returns {int} the number of appearances of the password
 */
function numPasswordAppearances(password) {
    let passwordExists = 'SELECT COUNT(Password) FROM users WHERE Password=?';

    return new Promise((resolve, reject) => {
        connection.query(passwordExists, [password], (err, result) => {
            if(err) reject(err);
            let numAppearances = result[0]["COUNT(Password)"];
            console.log('Num password appearances = ' + numAppearances);
            resolve(numAppearances);
        });
    });
    
}


/**
 * Check if the password correctly corresponds to the username it was provided with.
 * 
 * @param {VARCHAR} username 
 * @param {VARCHAR} password 
 * @return doesMatch
 */
function passwordMatchesUsername(username, password) {
    let passwordMatches = 'SELECT Password FROM users WHERE Username=?';

    return new Promise((resolve, reject) => {
        connection.query(passwordMatches, [username], (err, result) => {
            if(err) reject(err);
            let doesMatch = result[0]["Password"] === password;
            console.log('Does match = ' + doesMatch);
            resolve(doesMatch);
        });
    })
}

/**
 * Validates that the user data is fit to log the user in
 * @param {JSON} loginData 
 * @returns isValid
 */
async function validateLogin(loginData) {
    isValid = false;

    // check:
    // 1. The provided username exists in the database
    // 2. The provided password exists in the database
    // 3. The provided password corresponds to the provided username

    try {
        if (await numUsernameAppearances(loginData.username) === 1) {
            if (await numPasswordAppearances(loginData.password) === 1) {
                if (await passwordMatchesUsername(loginData.username, loginData.password)) {
                    isValid = true;
                }
            }
        }

        return isValid;
    }
    catch (err) {
        console.log('Validate login error:', err.message);
    }
}

/**
 * Generates a random account number with a given length
 * 
 * I am not good at coming up with these kind of algorithms so I got this one from this website
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


router.post('/login', (req, res) => {
    loginData = req.body;
    console.log(loginData);
    if (validateLogin(loginData)) {
        console.log('Login data is a valid user');
    }
});


router.post('/register', (req, res) => {
    registerData = req.body;
    console.log(registerData);
    validateNewUser(registerData);
    console.log('User data is valid');
    registerUser(registerData);
});

  
module.exports = router;
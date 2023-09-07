if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const path = require('path');
const bcrypt = require('bcrypt');
const connection = require('./database');
const methodOverride = require('method-override');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('../passport-config');
initializePassport(
    passport,
    async username => {
        let selectUser = 'SELECT * FROM users WHERE Username=?';

        return new Promise((resolve, reject) => {
            connection.query(selectUser, [username], (err, result) => {
                if(err) reject(err);
                let user = result[0];
                console.log(user);
                resolve(user);
            });
        })
    },
    async id => {
        let select = 'SELECT * FROM users WHERE ID=?';

        return new Promise((resolve, reject) => {
            connection.query(select, [id], (err, result) => {
                if(err) reject(err);
                let user = result[0];
                console.log(user);
                resolve(user);
            });
        });
    }
);

router.use(methodOverride('_method'));
router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('../myaccount')
    } else {
        next();
    }
}

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
async function validateNewUser(registerData) {
    let isValid = false;

    try {
        if (await numUsernameAppearances(registerData.username) === 0) {
            console.log('Username not taken');
            if (registerData.password == registerData.password_conf) {
                console.log('Passwords match!');
                isValid = true;
            }
        }
    } catch(err) {
        console.log('Validate new user error:', err.message);
    }

    /*
    if (await numPasswordAppearances(encryptedPassword) === 0) {
        console.log('Password not taken');
    }
    */

    return isValid;
}

/**
 * Load the validated user data to the users table
 * 
 * @param {JSON} registerData - the validated data entered by the user for registration
 */
function registerUser(registerData, encryptedPassword) {
    let accountNum = generateAccountNum(14);

    let insertStatement = 
    `INSERT INTO users (AccountNum, Username, Password, FirstName, LastName, DOB, Address, City, State, Zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    //console.log('Username in registerUser: ' + registerData.username);
    var items = [accountNum, registerData.username, encryptedPassword, registerData.first_name, registerData.last_name, registerData.birthday, registerData.address, registerData.city, registerData.state, registerData.zipcode];

    connection.query(insertStatement, items, (err, results, fields) => {
        if (err) {
            console.log(err.message);
        }
    });
}


router.get('/', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.resolve('public/html/login.html'));
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '../myaccount',
    failureRedirect: '/',
    failureFlash: true
}))


router.post('/register', async (req, res) => {
    try {
        registerData = req.body;
        const hashPassword = await bcrypt.hash(registerData.password, 10);     // encrypt the given password
        console.log('Hashed password:', hashPassword);
        if (await validateNewUser(registerData)) {
            console.log('user is valid');
            registerUser(registerData, hashPassword);
            console.log('User registered');
        } else {
            console.log('Invalid register credentials');
        }
    } catch(err) {
        console.log('Register api error:', err.message);
    }
});

router.delete('/logout', (req, res) => {
    req.logOut(function(err) {
        if (err) return err;
        res.redirect('/login');
    });
})

  
module.exports = router;
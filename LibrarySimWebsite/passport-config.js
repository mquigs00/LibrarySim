const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    console.log('Inside initalize function');
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);
        console.log('User data in initialize:', user);

        // if no user exists with the given username, exit and send a message
        if (user == null) {
            return done(null, false, {message: 'Incorrect Username or Password'});
        }

        try {
            // if the password provided matches the associated password in the database
            console.log('HTML Password:', password);
            console.log('DB Password:', user['Password']);
            if (await bcrypt.compare(password, user['Password'])) {
                console.log('Password entered matches db password');
                return done(null, user);
            } else {
                // Password does not match username
                return done(null, false, {message: 'Incorrect Username or Password'});
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user['ID']));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;
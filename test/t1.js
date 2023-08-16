const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of salt rounds for bcrypt

const plaintextPassword = '123456';

// Generate a salt and hash the password
bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    // Store the hash in your database
    console.log('Hashed Password:', hash);
    
    // Now you can save the hash in the user's record in the database
});
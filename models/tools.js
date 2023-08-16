const bcrypt = require('bcrypt');


var tools = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


tools.prepquery = function(query){
    var query1;
    var query0 = query.replace(/\s+/g, '%').toLowerCase();
    var query01 = query0.replace(/\s\s+/g, '').toLowerCase();
    query1 = '%'+ query01 + '%';
    return query1
}

tools.verifyJSON = function(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  } 


tools.hashPass = function(plaintextPassword, callback){
    const saltRounds = 10; // Number of salt rounds for bcrypt

    bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
        if (err) {
            return callback(err, null);
        }
        callback(null, hash);
    });
}

tools.verifyPass = function(enteredPassword, storedHashedPassword, callback) {
    bcrypt.compare(enteredPassword, storedHashedPassword, function(err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

/*
// Example usage
const plaintextPassword = 'userPassword123';
hashPassword(plaintextPassword, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    // Store the hash in your database
    console.log('Hashed Password:', hash);

    // Example verification
    const enteredPassword = 'userPassword123';
    verifyPassword(enteredPassword, hash, function(err, result) {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }

        if (result) {
            console.log('Password is correct');
            // Allow the user to log in
        } else {
            console.log('Password is incorrect');
            // Deny login
        }
    });
});

*/







module.exports = tools;
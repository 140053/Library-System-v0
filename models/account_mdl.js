require('dotenv').config();
const knex = require('knex');
const config = require('../database/knexfile');
const toolbox = require('./tools');

const environment = 'development'; // Change this based on your environment
const db = knex(config[environment]);


const dbName = process.env.DB_DATABASE;

db.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`)
    .then(() => {
        console.log(`Database Connection to "${dbName}" created successfully.`);
        //db.destroy();
    })
    .catch((error) => {
        console.error('Error creating database:', error);
        db.destroy();
    });

//Task object constructor
var model = function (task) {
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

model.login_mdl = function (data, result) {
    //check match email and get it 
    var nrow
    var npass = null;
    db('libman_user')
        .where({
            email: data.email
        })
        .select('id', 'name', 'auth', 'email', 'password', 'campus')
        .first()
        .then(function (row) {
            if (row) {
                toolbox.verifyPass(data.password, row.password, function (verr, vres) {
                    if (verr) {
                        console.error('Error comparing passwords:', err);
                        //return;
                        npass = null;
                        result({ status: false }, null)
                    } else {
                        if (vres) {
                            console.log('Password is correct');
                            nrow =  Object.assign({}, {status: true}, row);
                            result(null, nrow)

                        } else {
                            console.log('Password is incorrect');
                            result({ status: false }, null)
                            // Deny login
                        }
                    }


                });
            }
        }).catch(function (error) {
            console.error("Error:", error);
            result({ status: false }, null)
        });



}




module.exports = model;

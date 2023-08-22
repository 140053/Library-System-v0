require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');
const { pipeline } = require('stream');

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


//patronlog insert
model.ingestPatronlog = function(data, result){
    // data = { idnum: '00-0000', library: 'Pili', Section: 'gfloor' }
    db("libman_patronlog")
    .insert({
        pid: data.idnum,
        campus: data.library,
        section: data.Section,
        mode: data.mode
    })
    .then(function(res){
        result(null, true)
    })
}

//patron update mode to exit
model.updateModeExit = async function(data, result){
    db("libman_patronlog")
    .where("pid", data.idnum)
    .whereNull("reg_out")
    .update({
        "mode": data.mode
    })
    .then(function(res){
        result(null, res);

    })
}

//check patron mode
model.getPatronByID = function(data, result){
    db("libman_patron")
    .where({'IDnum': data.idnum}) 
    .first()  
    .then(function(res){
        result(null, res);
    })
}


model.checkLastMode = function(data, result){
    db("libman_patronlog")
    .where({pid: data.idnum})
    .orderBy('id', 'desc')
    //.whereNull("reg_out")    
    .then(function(res){
        result(null, res);
    })

}



//get patron list 
model.listPatron = function(result){
    db('libman_patron')
    .then(function (res) {
       result(null, res)
    }).catch(function (error) {
        console.error("Error:", error);
        result({ status: false }, null)
    });
}

//IMPORT USING CSV
model.importCSV = async function (fname, result) {

    const inputFile = "public/file/patron/" + fname;

    //async function insertCSVData(inputFile) {
    fs.access(inputFile, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', inputFile);
            result(err, null);
            return;
        }
        const readableStream = fs.createReadStream(inputFile);

        try {
            readableStream
                .pipe(csv())
                .on('data', async row => {
                    const query = 'INSERT INTO libman_patron (name, address,	Degree_Course,	User_Class,	Year_Level,	IDnum,	DateApplied,	DateExpired,	email,	gender,	campus  ) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)';
                    const values = [
                        row.name,
                        row.address,
                        row.Degree_Course,
                        row.User_Class,
                        row.Year_Level,
                        row.IDnum,
                        row.DateApplied,
                        row.DateExpired,
                        row.email,
                        row.gender,
                        row.campus
                    ];

                    try {
                        const [results, fields] = await db.raw(query, values);
                        //print(values)
                        console.log(results);
                        //console.log(values)
                    } catch (error) {
                        console.error('Error inserting row:', error);
                    }
                })
                .on('end', () => {
                    console.log('CSV file processing complete');
                });
        } catch (error) {
            console.error('Error processing CSV:', error);
            result(error, null);
        }

    })

    //if (insertCSVData(inputFile)) {
    //    result(null, 'CSV processing complete');
    //};

}


module.exports = model;

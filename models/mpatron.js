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





//POST model for form insert patron 

model.ingestPatron = function(data, result){
    db("libman_patron")
    .insert({
        name: data.name,
        address: data.address,
        Degree_Course: data.Kurso,
        User_Class: data.group,
        Year_Level: data.year,
        IDnum: data.idnum,
        email: data.email,
        gender: data.gender,
        campus: data.campus
    })
    .then(function(res){
        result(null, true)
    })
}


//patronlog insert
model.ingestPatronlog = function(data, result) {
    if (!data.idnum || !data.library || !data.Section || !data.mode) {
        result("Missing required data fields", null);
        return;
    }

    var ndate = data.date + ' 00:00:00'; // Corrected date format
    db("libman_patronlog")
        .insert({
            pid: data.idnum,
            campus: data.library,
            section: data.Section,
            mode: data.mode
            
        })
        .then(function(res) {
            result(null, true);
        })
        .catch(function(err) {
            result(err, null);
        });
};

model.ingestPatronlogMod = function(data, result) {
    if (!data.date || !data.idnum || !data.library || !data.Section || !data.mode) {
        result("Missing required data fields", null);
        return;
    }

    var ndate = data.date + ' 00:00:00'; // Corrected date format
    db("libman_patronlog")
        .insert({
            pid: data.idnum,
            campus: data.library,
            section: data.Section,
            mode: data.mode,
            reg_in: ndate
        })
        .then(function(res) {
            result(null, true);
        })
        .catch(function(err) {
            result(err, null);
        });
};


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
    var id = data.idnum;
    var idnum = "%" + id + "%";
    db("libman_patron")
    .where({IDnum: id} ) 
    .first()  
    .then(function(res){
        result(null, res);
    })
}


model.checkLastMode = function(data, result){
    db("libman_patronlog")
    .where({pid: data.idnum})
    .orderBy('id', 'desc')
    .limit(1)
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
                    // Remove extra spaces from each value
                    for (const key in row) {
                        if (row.hasOwnProperty(key) && typeof row[key] === 'string') {
                            row[key] = row[key].trim(); // Remove leading and trailing spaces
                        }
                    }

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



//Reports 

model.getPatronToday = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'

    db.raw("SELECT libman_patronlog.pid AS IDnum,libman_patron.name AS name, libman_patron.gender AS gender,libman_patron.Degree_Course AS Degree_Course,libman_patronlog.campus AS campus, libman_patronlog.section AS section,libman_patronlog.mode AS mode, libman_patronlog.reg_in AS reg_in, libman_patronlog.modeOut AS mode_out,libman_patronlog.reg_out AS reg_out FROM libman_patronlog      LEFT JOIN libman_patron ON libman_patronlog.pid = libman_patron.IDnum      WHERE reg_in LIKE '"+datemonth2+"'      ORDER BY reg_in DESC")
   
    /*
    db("libman_patronlog")
        .select(           
            'libman_patron.IDnum as IDnum',
            'libman_patron.name as name',
            'libman_patron.gender as gender',
            'libman_patron.Degree_Course as Degree_Course',
            'libman_patronlog.campus as campus',
            'libman_patronlog.section as section',
            'libman_patronlog.mode as mode',
            'libman_patronlog.reg_in as reg_in',
            'libman_patronlog.modeOut as mode_out',
            'libman_patronlog.reg_out as reg_out'
        )
        .leftJoin('libman_patron', 'libman_patronlog.pid', '=', 'libman_patron.IDnum')
        .where("reg_in", "like", datemonth2)
        .orderBy('reg_in', 'desc')
        //.orderByRaw('reg_in DESC')
        //.andWhere("campus", "Pili")
        */        
        .then(function(res) {
            result(null, res);
        })
        .catch(function(err) {
            result(err, null);
        });
}

//month
model.getPatronMonth = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
        db.raw("SELECT libman_patronlog.pid AS IDnum,libman_patron.name AS name, libman_patron.gender AS gender,libman_patron.Degree_Course AS Degree_Course,libman_patronlog.campus AS campus, libman_patronlog.section AS section,libman_patronlog.mode AS mode, libman_patronlog.reg_in AS reg_in, libman_patronlog.modeOut AS mode_out,libman_patronlog.reg_out AS reg_out FROM libman_patronlog      LEFT JOIN libman_patron ON libman_patronlog.pid = libman_patron.IDnum      WHERE reg_in LIKE '"+datemonth2+"'      ORDER BY reg_in DESC")
    /*
    db("libman_patronlog")
        .select(           
            'libman_patronlog.pid as IDnum',
            'libman_patron.name as name',
            'libman_patron.gender as gender',
            'libman_patron.Degree_Course as Degree_Course',
            'libman_patronlog.campus as campus',
            'libman_patronlog.section as section',
            'libman_patronlog.mode as mode',
            'libman_patronlog.reg_in as reg_in',
            'libman_patronlog.modeOut as mode_out',
            'libman_patronlog.reg_out as reg_out'
        )
        .leftJoin('libman_patron', 'libman_patronlog.pid', '=', 'libman_patron.IDnum')
        .where("reg_in", "like", datemonth2)
        .orderByRaw('reg_in DESC')
        //.andWhere("campus", "Pili") 
        */       
        .then(function(res) {
            result(null, res);
        })
        .catch(function(err) {
            result(err, null);
        });
}

model.getPatronLMonth = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth())).slice(-2))  +'-%'    
    db("libman_patronlog")
        .select(           
            'libman_patronlog.pid as IDnum',
            'libman_patron.name as name',
            'libman_patron.gender as gender',
            'libman_patron.Degree_Course as Degree_Course',
            'libman_patronlog.campus as campus',
            'libman_patronlog.section as section',
            'libman_patronlog.mode as mode',
            'libman_patronlog.reg_in as reg_in',
            'libman_patronlog.modeOut as mode_out',
            'libman_patronlog.reg_out as reg_out'
        )
        .leftJoin('libman_patron', 'libman_patronlog.pid', '=', 'libman_patron.IDnum')
        .where("reg_in", "like", datemonth2)
        .orderByRaw('reg_in DESC')
        //.andWhere("campus", "Pili")        
        .then(function(res) {
            result(null, res);
        })
        .catch(function(err) {
            result(err, null);
        });
}


model.getPatronLC = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    db("libman_patronlog")
        .select(  
            'libman_patron.IDnum as IDnum',         
            'libman_patron.name as name',
            'libman_patron.gender as gender',
            'libman_patron.Degree_Course as Degree_Course',
            'libman_patronlog.campus as campus',
            'libman_patronlog.section as section',
            'libman_patronlog.mode as mode',
            'libman_patronlog.reg_in as reg_in',
            'libman_patronlog.modeOut as mode_out',
            'libman_patronlog.reg_out as reg_out'
        )
        .leftJoin('libman_patron', 'libman_patronlog.pid', '=', 'libman_patron.IDnum')
        .where("reg_in", "like", datemonth2)
        .andWhereLike('section', 'Second%')
        .orderByRaw('reg_in DESC')
        //.andWhere("campus", "Pili")        
        .then(function(res) {
            result(null, res);
        })
        .catch(function(err) {
            result(err, null);
        });
}

//get count by course 

model.getreportByCourse = function( result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'

    db("libman_patronlog")
    .select(
        'libman_patron.Degree_Course'        
    )
    .count('*', {as: 'cnt'})
    .leftJoin('libman_patron', 'libman_patronlog.pid', '=', 'libman_patron.IDnum')
    .where("reg_in", "like", datemonth3)
    .groupBy('Degree_Course')
    .then(function(res) {
        result(null, res);
    })
    .catch(function(err) {
        result(err, null);
    });

}

//get count by Section 


model.getreportBySection = function(section , result){
    var sect = section;
    var sqlSec = "";
    if( sect == "gencir"){
        sqlSec = "Ground%";
    }
    if( sect == "lern"){
        sqlSec = "Second%";
    }
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    //console.log(datemonth3);

    var sql = "SELECT Degree_Course , count(*) as cnt FROM libman_patron as p JOIN libman_patronlog as pl on p.IDnum = pl.pid where pl.section like '"+ sqlSec +"' and pl.reg_in like '"+ datemonth3 +"'  group by Degree_Course ;"
    
    db.raw(sql)
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

}


model.getreportByGender = function(section , result){
    var sect = section;
    var sqlSec = "";
    if( sect == "gencir"){
        sqlSec = "Ground%";
    }
    if( sect == "lern"){
        sqlSec = "Second%";
    }
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    //console.log(datemonth3);

    var sql = "SELECT gender , count(*) as cnt FROM libman_patron as p JOIN libman_patronlog as pl on p.IDnum = pl.pid where  pl.reg_in like '"+ datemonth3 +"'  group by gender ;"
    
    db.raw(sql)
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

}

model.getreportByUserClass = function( result){
    
   
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    //console.log(datemonth3);

    var sql = "SELECT User_Class as uclass , count(*) as cnt FROM libman_patron as p JOIN libman_patronlog as pl on p.IDnum = pl.pid WHERE pl.reg_in like '"+ datemonth3 +"' group by User_Class ;";
    
    db.raw(sql)
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

}


model.getGenderByCourseMale = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    //console.log(datemonth3);

    db.raw("SELECT Degree_Course as male , count(*) as cnt FROM libman_patron as p JOIN libman_patronlog as pl on p.IDnum = pl.pid Where gender = 'Male' and reg_in like '"+ datemonth3+"'    group by Degree_Course ;")
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });


    
}

model.getGenderByCourseFemale = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    //console.log(datemonth3);

    db.raw("SELECT Degree_Course as female , count(*) as cnt FROM libman_patron as p JOIN libman_patronlog as pl on p.IDnum = pl.pid Where gender = 'Female' and reg_in like '"+ datemonth3+"'   group by Degree_Course ;")
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

}

model.getGenderByCourseAll = function(result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    db.raw("SELECT  Degree_Course, COUNT(CASE WHEN gender = 'Male' THEN 1 END) AS male_cnt, COUNT(CASE WHEN gender = 'Female' THEN 1 END) AS female_cnt  FROM libmanV0.libman_patron as p JOIN libmanV0.libman_patronlog as pl on p.IDnum = pl.pid where  pl.reg_in like '"+datemonth3+"' group by Degree_Course ;")
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

    //db.raw("SELECT  Degree_Course, COUNT(CASE WHEN gender = 'Male' THEN 1 END) AS male_cnt, COUNT(CASE WHEN gender = 'Female' THEN 1 END) AS female_cnt  FROM libmanV0.libman_patron as p JOIN libmanV0.libman_patronlog as pl on p.IDnum = pl.pid where pl.section like 'Sec%' and pl.reg_in like '"+datemonth3+"' group by Degree_Course ;")
    
}


model.getGenderByCourseSect = function( section,  result){

    var sect  = section;
    var sectVar = '';

    if(sect == 'lern'){
        sectVar = 'section like "Second%"'
    }

    if(sect == 'cir'){
        sectVar = 'section like "Ground%"'
    }
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +'%'
    var datemonth3 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'

    var sql = "SELECT  Degree_Course, COUNT(CASE WHEN gender = 'Male' THEN 1 END) AS male_cnt, COUNT(CASE WHEN gender = 'Female' THEN 1 END) AS female_cnt  FROM libmanV0.libman_patron as p JOIN libmanV0.libman_patronlog as pl on p.IDnum = pl.pid where "+sectVar+" and pl.reg_in like '"+datemonth3+"'  group by Degree_Course ;"
    //console.log(sql)
    db.raw(sql)    
    .then(function(res) {
        //console.log(res[0])
        result(null, res);
        //console.log(sqlSec + ' ' + sql + ' ' + JSON.stringify(res[0]))
    })
    .catch(function(err) {
        result(err, null);
    });

    //db.raw("SELECT  Degree_Course, COUNT(CASE WHEN gender = 'Male' THEN 1 END) AS male_cnt, COUNT(CASE WHEN gender = 'Female' THEN 1 END) AS female_cnt  FROM libmanV0.libman_patron as p JOIN libmanV0.libman_patronlog as pl on p.IDnum = pl.pid where pl.section like 'Sec%' and pl.reg_in like '"+datemonth3+"' group by Degree_Course ;")
    
}










module.exports = model;

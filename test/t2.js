const fs = require('fs');
const csv = require('csv-parser');



const inputFile = "../public/file/patron/PATRON TEMPLATE.csv";

// Define the function to insert CSV data into the database
async function insertCSVData(inputFile) {
    const readableStream = fs.createReadStream(inputFile);

    try {
        readableStream
            .pipe(csv())
            .on('data', async row => {
                const query = 'INSERT INTO libman_patron (name, address,	Degree_Course,	User_Class,	Year_Level,	IDnum,	DateApplied,	DateExpired,	email,	gender,	campus,	Bkloan,	telephone,	Overdue,	remarks,	suspended,	tag  ) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
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
                    row.campus,
                    row.Bkloan,
                    row.telephone,
                    row.Overdue,
                    row.remarks,
                    row.suspended,
                    row.tag
                ];

                try {
                    const [results, fields] = await db.raw(query, values);
                    //print(values)
                    console.log('Inserted row ID:');
                    //console.log(values)
                } catch (error) {
                    console.error('Error inserting row:', error);
                }
            })
            .on('end', () => {
                console.log('CSV file processing complete');
                result(null, 'CSV processing complete');
            });
    } catch (error) {
        console.error('Error processing CSV:', error);
        //result(error, null);
    }
}

// Call the insertCSVData function
insertCSVData(inputFile);


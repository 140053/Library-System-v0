const express = require('express');
const route = express.Router();
const path = require('path');
const dapp = require("../controllers/dfileUpload");
const mpatron = require("../models/mpatron")


const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/file/patron');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
      console.log(file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
  

route.post('/patron'  ,upload.single('file'),  (req, res) => {

    // Here you can access the uploaded file details through req.file
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    mpatron.importCSV(req.file.filename, function(err, result){
      // You can perform further processing or save the file information in a database
      // For now, let's just send a success response
      res.status(200).json({ message: 'File uploaded successfully' });
    })

    
});

route.post('/patron2' ,upload.single('file'),  (req, res) => {

  console.log(req.file.filename);

  // Here you can access the uploaded file details through req.file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // You can perform further processing or save the file information in a database
  // For now, let's just send a success response
  res.status(200).json({ message: 'File uploaded successfully' });
});


route.get('/patron-template', (req, res) => {
  const filePath = path.join(__dirname, '../docs/PATRON TEMPLATE.csv'); // Replace with the actual path to your file

  // Set appropriate headers for the download
  res.setHeader('Content-Disposition', 'attachment; filename=PATRON TEMPLATE.csv'); // Change the filename as needed
  res.setHeader('Content-Type', 'text/csv'); // Set the MIME type of the file

  // Send the file for download
  res.download(filePath, 'PATRON TEMPLATE.csv', err => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('An error occurred while downloading the file.');
    }
  });
})


module.exports = route;

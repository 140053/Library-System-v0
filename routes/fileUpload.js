const express = require('express');
const route = express.Router();
const dapp = require("../controllers/dfileUpload");


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
  

route.post('/patron' ,upload.single('file'),  (req, res) => {
    // Here you can access the uploaded file details through req.file
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    // You can perform further processing or save the file information in a database
    // For now, let's just send a success response
    res.status(200).json({ message: 'File uploaded successfully' });
  });


module.exports = route;

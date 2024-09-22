const multer = require('multer');
const path = require('path');

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath      
      if(file.fieldname === 'profilePicture'){
        uploadPath  = path.join(__dirname,'../uploads/studentProfile/');
      }
      else if(file.fieldname === 'tenthMarksheet'){
        uploadPath  = path.join(__dirname,'../uploads/tenthCertificate/');
      }
      else if(file.fieldname === 'twelfthMarksheet'){
        uploadPath  = path.join(__dirname,'../uploads/twelfthCertificate/');
      }
      else if(file.fieldname === 'aktuResult'){
        uploadPath  = path.join(__dirname,'../uploads/aktuResult/');
      }
      else if(file.fieldname === 'resume'){
        uploadPath  = path.join(__dirname,'../uploads/resume/');
      }
      else{
        uploadPath  = path.join(__dirname,'../uploads/');
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      let newFileName;
      if (file.fieldname === 'profilePicture') {
        newFileName = `${req.body.studentAdmNum}.jpg`;
        req.body.profilePicture = `http://localhost:5000/uploads/studentProfile/${newFileName}`;
      }
      else if(file.fieldname === 'tenthMarksheet'){
        newFileName = `${req.body.studentAdmNum}.pdf`;
        req.body.tenthMarksheet = `http://localhost:5000/uploads/tenthCertificate/${newFileName}`;
      }
      else if(file.fieldname === 'twelfthMarksheet'){
        newFileName = `${req.body.studentAdmNum}.pdf`;
        req.body.twelfthMarksheet = `http://localhost:5000/uploads/twelfthCertificate/${newFileName}`;
      }
      else if(file.fieldname === 'aktuResult'){
        newFileName = `${req.body.studentAdmNum}.pdf`;
        req.body.aktuResult = `http://localhost:5000/uploads/aktuResult/${newFileName}`;
      }
      else if(file.fieldname === 'resume'){
        newFileName = `${req.body.studentAdmNum}.pdf`;
        req.body.resume = `http://localhost:5000/uploads/resume/${newFileName}`;
      }
      else{
        newFileName = file.originalname;
      }
      cb(null, newFileName);
    }
  });
  
const StudentProfileUpload = multer({
    storage: profileStorage,
  }).fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelfthMarksheet', maxCount: 1 },
    { name: 'aktuResult', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]);


  const JobStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads/job/');
      req.body.companyLogo = "http://localhost:5000/uploads/job/" + `${req.body.jobID}.jpg`;
      console.log('Upload Path:', uploadPath); // Debug: Log the upload path
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const newFileName = `${req.body.jobID}.jpg`;
      console.log('New File Name:', newFileName); // Debug: Log the new file name
      cb(null, newFileName);
    }
  });
  
  const JobLogoUpload = multer({
    storage: JobStorage,
    // fileFilter:(req,file,cb)=>{
    //     const allowedExtensions = ['.jpg','.jpeg','.png'];
    //     const fileExtention = path.extname(file.originalname).toLowerCase();

    //     if(allowedExtensions.includes(fileExtention)){
    //         cb(null,true);
    //     }
    //     else{
    //         cb('Unsupported Company Logo type',false);
    //     }
    // }
  }).fields([
    { name: 'companyLogo', maxCount: 1 }
  ]);
  
  module.exports = { JobLogoUpload , StudentProfileUpload };
const express = require('express');
const cors = require('cors');
const path = require('path');
const Router = require('./Routers/Route');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/',Router);
app.use('/uploads/job', express.static(path.join(__dirname, 'uploads', 'job')));
app.use('/uploads/studentProfile',express.static(path.join(__dirname,'uploads','studentProfile')));
app.use('/uploads/tpoProfile',express.static(path.join(__dirname,'uploads','tpoProfile')));
app.use('/uploads/aktuResult',express.static(path.join(__dirname,'uploads','aktuResult')));
app.use('/uploads/tenthCertificate',express.static(path.join(__dirname,'uploads','tenthCertificate')));
app.use('/uploads/twelfthCertificate',express.static(path.join(__dirname,'uploads','twelfthCertificate')));
app.use('/uploads/resume',express.static(path.join(__dirname,'uploads','resume')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


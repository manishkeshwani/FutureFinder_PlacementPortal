const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/FutureFinder';

dbConnect = async()=>{
    try{
        await mongoose.connect(uri);
        console.log("Database Connected");
    }catch(error){
        console.log("Database Connection Failed");
    }
}

dbConnect();
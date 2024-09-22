const jwt = require('jsonwebtoken');

const generateToken = (doc)=>{
    const payload = {email:doc};
    const secret = "welcome to future finder";
    const options={
        expiresIn:180
    }
    const token = jwt.sign(payload,secret,options);
    return token;
}

const verifyToken = (token)=>{
    const secret = "welcome to future finder";
    try{
        const inValid = jwt.verify(token,secret);
        return true;
    }catch(error){
        return false;
    }
}

module.exports = { generateToken , verifyToken }
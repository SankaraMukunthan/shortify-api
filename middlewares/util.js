const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const JwtToken = {
    getJwtToken(payload){
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn: '1d'
    });
        return token;
    },
   async getEncryptedPwd(password){
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password,salt);
    return hash;
   }

}

module.exports = JwtToken;
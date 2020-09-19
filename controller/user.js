const userValidation = require('../validation/user');
const UserModel = require('../models/user');
const bcryptJs = require('bcryptjs');
const User = require('../models/user');
const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const jwtToken = require('../middlewares/util');
const mailModule = require('../middlewares/mail');
const { findOne } = require('../models/user');
const { has } = require('config');
require('dotenv').config();

const userController = {
    async signup (req,res) {
        try {
             //validate object  
         const {error, value} = userValidation.validateSchema(req.body);
         if(error && error.details) {
            res.status(400).json(error);
         }
         
    
        //encrypt the pwd
    
        //create new user
        const user = await UserModel.create(value);
        return res.json({success:true,message:'user created successfully'});
        
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    async login(req,res) {
        try {
            //validate object
        const {error, value} = userValidation.loginValidation(req.body);
         if(error && error.details) {
           return res.status(400).json(error);
         }
         // check if user is available
         const user =await User.findOne({emailId:value.emailId});
         if(!user){
            return res.status(BAD_REQUEST).json({err: 'invalid email or password'});
         }

         //passsword comparison
         const matched = bcryptJs.compare(value.pwd, user.pwd);
         if(!matched){
            return res.status(UNAUTHORIZED).json({err:'Invalid password'})
         }
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
         return res.json({success:true, token:token});
         
        
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json(error);
        }
    },
    async profile(req, res){
        const {id } = req.params;
        User.findById(id).then(user => {
            if(!user){
               return res.status(NOT_FOUND).json({err:'could not find user'});
            }
            return res.json(user);
        });
    },
    async test(req,res) {
        return res.json(req.user);
    },
    async forgotPassword(req, res){
        try {
            const {error, value} = userValidation.forgotPasswordValidation(req.body);
         if(error && error.details) {
           return res.status(400).json(error);
         }
         const user =await User.findOne({emailId: req.body.emailId});
         if(!user){
             return res.status(NOT_FOUND).json({err:'could not find user'})
         }

         const token = jwtToken.getJwtToken({id:user._id});
        
         const resetLink =`
         <h4> Please click the link below to reset the password</h4>
         <a href=${process.env.fRONT_BASE_URL}/reset-password/${token}>Click me to reset</a>
         `;

         const results =await  mailModule.sendTransportMail({
             html: resetLink,
             subject: "Password reset",
             email:user.emailId
         });
         console.log(results);


            return res.json(results);
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json(error);
        }
    },
    async resetPassword(req, res){
        try {

            const {pwd}= req.body;
            if(!pwd){
                return res.status(BAD_REQUEST).json({err:'password is required'});
            }
            
            const user = await User.findById(req.user._id);
            const hash = await jwtToken.getEncryptedPwd(pwd);
            user.pwd = hash;
            await user.save();
            return res.json({success: true})
            
        } catch (error) {
            console.error(error);
            res.status(INTERNAL_SERVER_ERROR).json(error); 
        }

    }


}

module.exports = userController;
const nodemailer = require('nodemailer');
const Promise = require('promise')
const htmlToText = require('html-to-text');
const config = require('config');

const ethereal = config.get('ethereal');

const mailModule = {
sendTransportMail(options){
   
   return new Promise((resolve, reject)=>{
        const transporter = nodemailer.createTransport({
            host: ethereal.host,
            post:ethereal.post,
            auth:{
                user:ethereal.username,
                pass:ethereal.password
            }
        });
    const text = htmlToText.fromString(options.html,{
        wordwrap:30
    });
    const mailOptions = {
        from: '"sankara mukunthan"<noreply@shortify.com>',
        to: options.email,
        subject:options.subject,
        text,
        html:options.html
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return reject(error);
        }
        console.log('message id',info.messageId);
        console.log('preview url', nodemailer.getTestMessageUrl(info));
        return resolve({message:'Reset Email has sent to your inbox'});
    });
    });
}}
module.exports = mailModule;
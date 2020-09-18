const express = require('express');
const { Passport, session } = require('passport');
const passport = require('passport');
const router = express.Router();


const urlController = require('../controller/url');


router.post('/shorten',passport.authenticate(
    'jwt', {session: false}
), urlController.createShortenUrl );

router.get('/',passport.authenticate(
    'jwt',{session: false}
    ), urlController.findAllByUser);
module.exports = router;
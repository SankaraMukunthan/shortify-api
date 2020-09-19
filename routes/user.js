const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controller/user');

router.post('/signup',userController.signup );
router.post('/login',userController.login);
router.post('/forgotPassword',userController.forgotPassword);
router.post('/test',passport.authenticate(
    'jwt', {session: false}
),userController.test);
router.post('/reset-password',passport.authenticate(
    'jwt', {session: false}
),userController.resetPassword);
router.get('/:id',passport.authenticate(
    'jwt', {session: false}
),userController.profile);
module.exports = router;

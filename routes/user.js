const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controller/user');

router.post('/signup',userController.signup );
router.post('/login',userController.login);
router.post('/test',passport.authenticate(
    'jwt', {session: false}
),userController.test);
router.get('/:id',passport.authenticate(
    'jwt', {session: false}
),userController.profile);
module.exports = router;

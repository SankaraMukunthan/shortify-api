const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');

const swaggerDocument = require('../config/swagger.json');
const configureJwtStrategy = require('./passportJwt');

const setGlobalMiddleware= app => {
//middlewares
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({origin:'*'}));
app.use(passport.initialize());
configureJwtStrategy();
app.use(express.json());
app.use('/apiDoc',swaggerUi.serve,swaggerUi.setup(swaggerDocument,{
    explorer:true
}));

}

module.exports = setGlobalMiddleware;

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const {errorHandler, notFound} = require('./middlewares');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const logs = require('../api/logs');

const app = express();


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin : process.env.CORS_ORIGIN
}));
app.use(bodyParser.urlencoded({
    extended: true
  }));


app.get('/',(req,res)=>{
    res.json({
        message : 'Hello world'
    });
});

app.use('/api/logs',logs);

app.use(notFound);

app.use(errorHandler);


const port = process.env.PORT || 1337; 

app.listen(port, ()=>{
    console.log("Listening to server...");
})

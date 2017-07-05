//node modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

//config
const env = require('env2')('./.env')
var app = express();
var db = mongoose.connection;
var port = process.env.PORT || 3001;

//express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//importing models
var Admin = require('./models/adminModel');

//defining Routes
var adminRouter = require('./routes/adminRoutes')(Admin);
app.use('/api/admin', adminRouter);

//Opening DB connection
db.openUri(process.env.DB_URI, {
    useMongoClient: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

//Running the server
app.listen(port, function () {
    console.log('running on PORT: ' + port);
});
//node modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');    

//config
const env = require('env2')('./.env');
var app = express();
var db = mongoose.connection;
var port = process.env.PORT || 3001;

//express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport); 

//importing models
var User = require('./models/userModel');

//securing api routes
app.use('/api/*',passport.authenticate('jwt', { session: false }));
//defining api Routes
var userRouter = require('./routes/userRoutes')(User);
var authRouter = require('./routes/authRoutes')(User);
app.use('/api/user', userRouter);
app.use('/auth', authRouter);

//Opening DB connection
db.openUri(process.env.DB_URI, {
    useMongoClient: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

//Running the server
app.listen(port, function () {
    console.log('running on PORT: ' + port);
});
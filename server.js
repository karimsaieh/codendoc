//node modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');    

//config
const env = require('env2')('./.env');
var app = express();
mongoose.Promise = global.Promise;
var db = mongoose.connection;
var port = process.env.PORT || 3001;




//express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport); 

// to remove after building the ng apps 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authentification');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//importing models
var User = require('./models/userModel');

//securing api routes
app.use('/api/*',passport.authenticate('jwt', { session: false }));

//static //two ng apps .... ng build prod to deploy
app.use('/users', express.static(__dirname + '/public/users'));
app.use('/docs', express.static(__dirname + '/public/docs'));

//defining api Routes
var userRouter = require('./routes/userRoutes')(User);
var authRouter = require('./routes/authRoutes')(User);
app.use('/api/user', userRouter);
app.use('/auth', authRouter);

//redirecting to the users App
app.use('/',function (req,res) {
    res.redirect('/users'); 
});

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
//node modules
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
const path = require('path');    

//config
const env = require('env2')('./.env');
var app = express();
mongoose.Promise = global.Promise;
var db = mongoose.connection;
var port = process.env.PORT || 3001;




//express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(passport.initialize());
require('./config/passport')(passport); 

// to remove after building the ng apps 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    if ('OPTIONS' == req.method) {
     res.sendStatus(200);
 } else {
     next();
 }

});

//importing models
var User = require('./models/userModel');
var Project = require('./models/projectModel');
var Category = require('./models/categoryModel');
var Page = require('./models/pageModel');
var Feedback = require('./models/feedbackModel');



//securing api routes
app.use('/api/*',passport.authenticate('jwt', { session: false }));
    

//static //two ng apps .... ng build prod to deploy  
app.use('/users', express.static(__dirname + '/public/users'));
app.use('/docsApp', express.static(__dirname + '/public/docsApp'));
app.use('/users', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/users/index.html'));
});
app.use('/docsApp', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/docsApp/index.html'));
});
	
//defining api Routes
var userRouter = require('./routes/userRoutes')(User);
var authRouter = require('./routes/authRoutes')(User);
var projectRouter = require('./routes/projectRoutes')(Project);
var categoryRouter = require('./routes/categoryRoutes')(Category);
var pageRouter = require('./routes/pageRoutes')(Page);
var feedbackRouter = require('./routes/feedbackRoutes')(Feedback);
app.use('/api/user', userRouter);
app.use('/auth', authRouter);
app.use('/api/project', projectRouter);
app.use('/api/category', categoryRouter);
app.use('/api/page', pageRouter);
app.use('/api/feedback', feedbackRouter);
//public
var pageDocsRouter = require('./routes/docs/pageRoutes')(Page);
var projectDocsRouter = require('./routes/docs/projectRoutes')(Project);
var feedbackDocsRouter = require('./routes/docs/feedbackRoutes')(Feedback);

app.use('/docs/page', pageDocsRouter);
app.use('/docs/project', projectDocsRouter);
app.use('/docs/feedback', feedbackDocsRouter);


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
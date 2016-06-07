/**
 * Created by Sergi P on 13/03/2016.
 */
// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./controllers/auth');
var companyController = require('./controllers/company');
var userController = require('./controllers/User');




// Get the configuration packages
var configService = require('./config/service');
var configDB = require('./config/database');

// Connect to the aircompanies MongoDB
mongoose.connect(configDB.url);

// Create the express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({extended: true})).use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

// Use configuration port
var port = configService.port;

// Create our express router
var router = express.Router();

// Initial dummy route
//GET para todos las aerolineas


//GET para uno solo

//(ver viaño)
app.use('/api', router);
app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.use(express.static(__dirname + "/public"));

// Create endpoint handlers for /companies
router.route('/companies').post(companyController.postCompany).get(companyController.getCompanies);

// Create endpoint handlers for /companies/:company_id
router.route('/companies/:company_name').get(companyController.getCompany);


// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers);

// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id').get(authController.isAuthenticated, userController.getUser);

// Register all our routes with /api
app.use(configService.preffix, router);

// Handle no endpoint found
app.use(function(req, res, next) {
    var error = new Object();
    error.status = 404;
    error.message = 'The requested URL ' + req.protocol + '://' + req.get('host') + req.originalUrl + ' cannot be found';
    res.status(404).json(error);
});
//
//app.get('/',function(req,res){
//    res.sendFile(__dirname + 'public/web.html')
//})

/*router.get('/', function (req, res) {
    res.json({message:'Hello World!'})




});*/

// Start the server
app.listen(port);
console.log('Server started on port ' +port);





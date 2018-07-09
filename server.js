var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');
var request = require('request');
var path = require('path');
var dbSave= require('./DBModule.js');


var serviceAccount = require('./serviceAccountKey.json');

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://reuseplatform.firebaseio.com'
})

var database = firebaseAdmin.database();

// Create instance of express app
var app = express();

// We want to serve js and html in ejs
// ejs stands for embedded javascript
app.set('view engine', 'ejs');

// We also want to send css, images, and other static files
app.use(express.static('views'));
app.set('views', path.join(__dirname + '/views'));

// Give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

app.get('/', function(request, response){
    console.log(" Inside get request 11111................");
    response.render('index.ejs') ;       
    
});

app.post('/RepoSubmit', function(req, res) {
    console.log(" REpo submitted ");
    var modelDetails = {
        repoName : req.body.repoSelect,
        gitUserName: req.body.currentUserName,
        input:req.body.Inputfile,
        output:req.body.Outputfile
    };
    console.log(modelDetails);
    res.render('select',{
        topicHead : modelDetails.repoName,
    });
    dbSave.saveDB(database,modelDetails);
});

var port = process.env.PORT || 5000;

app.listen(port, function(){
    console.log('App running on port ' + port);
});



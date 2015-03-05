var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var express = require('express');
//var db = mongoskin.db('mongodb://<dbuser>:<password>@your.host.com:dbport/database', {safe:true});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();


router.route('/')
  .get(function(req, res){
    res.send('This is the api root');
  });

router.route('/users')
  .get(function(req, res){
    res.send('This will return a collection of all users')
  });

app.use('/api', router);

app.use(express.static(__dirname + '/../client/build'));


console.log('starting webserver on http://localhost:8080. Static root with API available from /api');

var port = process.env.PORT || 8080;

app.listen(port);

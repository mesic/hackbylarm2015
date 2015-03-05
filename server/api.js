var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var db = mongoskin.db('mongodb://<dbuser>:<password>@your.host.com:dbport/database', {safe:true});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// http://host/api
router.route('/')
  .get(function(req, res){
    res.send('please select a collection , e.g. /users');
  });

// http://host/api/projects
router.route('/projects')
  .get(function(req, res){
    db.collection('projects').find().toArray(function(err, items){
      res.json(items);
    });
  });

// http://host/api/users
router.route('/users')
  .get(function(req, res){
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    db.collection('users').find().toArray(function(err, items){
      console.log(err);
      console.log(items);
      res.json(items);
    });
  })

  .post(function(req, res){
    db.collection('users').save(req.body, function(err, result){
      res.send(result);
    });
  });

// http://host/api/users/:username
router.route('/users/:username')
  .get(function(req, res){
    var user = db.collection('users').findOne({username: req.params.username}, function(err, result){
      res.send(result);
    });
  });

router.route('/login')
  .post(function(req, res){
    var result = db.collection('users').findOne({username: req.body.username, password: req.body.password}, function(err, result){
      if(result == null){
        res.send(404);
      }else{
        res.send(200, {username: result.username});
      }
    });
  });

app.use('/api', router);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

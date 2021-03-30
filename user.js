var express = require('express');
var router = express.Router();
var app = require('./app.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'test'
});

connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.json(users);
}); */

/* router.get('/:id', function(req, res, next) {
  user = users.find(u => u.id === parseInt(req.params.id))
  res.send(user);
}); */

router.post('/signup', function (req, res) {
  var signupData = {
    'u_id': req.body.u_id,
    'u_email': req.body.u_email,
    'u_nm': req.body.u_nm,
    'u_pwd': req.body.u_pwd,    // TODO : Encryption
    'u_mobile_no': req.body.u_mobile_no,  // TODO : Encryption
    'reg_dt': req.body.reg_dt,
    'mod_dt': req.body.mod_dt,
    'last_login_dt': req.body.last_login_dt
  };

  var uniqueKeyCheckQuery = connection.query('select count(u_email) as emailcnt from tbl_user where u_email = ?', signupData['u_email'],
function (err, result) {
  console.log(result);
});

  var query = connection.query('insert into tbl_user set ?', signupData, 
function (err, result) {
    if (err) {
      console.error(err);
      
      if (err['errno'] == 1062) { // error number 1062 is duplicate error 
        console.log("0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0");
        console.log("UNIQUE KEY Duplicate ERROR");
        console.log("0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0*0");
        res.status(422).send('422 error');
      }
      throw err;
    }
    res.status(200).send('success');
    
  });
});


module.exports = router;

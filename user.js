var express = require('express');
var router = express.Router();
var app = require('./app.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '49.236.146.45',
  port: '13306',
  user: 'dev_test',
  password: 'dev_test',
  database: 'coding_test_db'
});

connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});


const users = [
  { id: 1, name: 'Node.js' },
  { id: 2, name: 'npm' },
  { id: 3, name: 'Pengsu' },
]

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
    'u_pwd': req.body.u_pwd,
    'u_mobile_no': req.body.u_mobile_no,
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
      
      if (err['errno'] == 1062) {
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


router.post('/', function (req, res, next) {
  const user = {
    id: users.length + 1,
    name: req.body.name
  }
  users.push(user);
  res.send(user);
});

module.exports = router;

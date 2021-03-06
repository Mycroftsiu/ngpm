/**
 * Created by mycroft on 2018/1/1.
 */
import * as express from 'express';


const app = express();


var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret :  'secret',
  resave : true,
  saveUninitialized: false,
  cookie : {
    maxAge : 1000 * 60 * 60,
  },
}));


app.listen(8000,() => {
  console.log('Server have been started with address: "http://localhost:8000" ');
});

app.get('/api/stock', (req, res) => {
   let result = stocks;
   let params = req.query;
   if(params.name){
     result = result.filter(stock => stock.name.indexOf(params.name));
   }
   res.json(result);
});

app.get('/api/stock/:id',(req, res) => {
   res.json(stocks.find(stock => stock.id == req.params.id));
});


export  class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ){

  }
}

const stocks: Stock[] =  [
  new Stock(1,"HSBC",75,4.0,"Banking Corporation",["Finance"]),
  new Stock(2,"APPLE",300,4.5,"Leading company",["TECH","IT"]),
  new Stock(3,"TENCENT",160,4.0,"Social Message",["IT"]),
  new Stock(4,"Alibaba",100,4.0,"E-commerce",["IT"]),
  new Stock(5,"GOOGLE",200,4.0,"Search Engine",["IT"]),
  new Stock(6,"ChinaLife",75,3.5,"Motor Corporation",["Insurance"])
];



var mongoose = require('mongoose');
var Person = require('../model/person');
var User = require('../model/user');
var Feedback = require('../model/feedback');

mongoose.connect('mongodb://localhost/db1');
mongoose.connection.on('connected',function () {
  console.log('database connect successfully')
});


// Person.create([
//   { name: "Mycroft", gender: "Male", age: 42, phone: 13221752117, department: "Information Technology", degree: "Bachelor", jobNumber: 12345678 },
//   { name: "Danny", gender: "Male", age: 33, phone: 13726879258, department: "Accounting and Finance", degree: "Doctor", jobNumber: 12312338 },
//   { name: "Joe", gender: "Male", age: 55, phone: 13846252197, department: "Production and Quality Assurance", degree: "Doctor", jobNumber: 41235678 },
//   { name: "Edmond", gender: "Male", age: 19, phone: 15921752230, department: "Research and Development", degree: "Master", jobNumber: 47983678 }
// ]);

//get person list
app.get('/api/person', (req, res) => {
  Person.find({}, (err, persons) => {
    if (err){
      console.log(err);
      res.send(500);
    }
    else{
      res.json(persons);
    }
  });
});

//get single person on person form
app.get('/api/person/:id',(req, res) => {
  Person.findById(req.params.id, (err, response) => {
    if (err) {
      console.log(err);
      res.send(500);
    }
    else {
      res.json(response);
    }
  });
});

//update single person
app.post('/api/person/:id', (req, res) => {
    Person.update({_id:req.params.id},{ $set: {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        department: req.body.department,
        phone: req.body.phone,
        degree: req.body.degree,
        jobNumber: req.body.jobNumber
    }}, (err, rawResponse) => {
      if(err){
        console.log(err);
        res.send(500);
      }else{
        res.send(rawResponse);
      }
    });
});

// create a new person
app.post('/api/personCreate', (req, res) => {
    Person.create({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      department: req.body.department,
      degree: req.body.degree,
      jobNumber: req.body.jobNumber
    }, (err, person) => {
      if(err){
        console.log(err);
        res.send(500);
      }else {
        res.send({success: 1, person: person});
      }
    });
});

//delete single person
app.delete('/api/person/:id',(req, res) => {
    Person.remove({_id: req.params.id}, (error, response) => {
    if(error){
      console.log(error);
      res.send(500);
    }
    else{
      res.send({success:1, response: response});
    }
  });
});


//account setting
//register an account
app.post('/api/createAccount', (req, res) => {
  User.findOne({email:req.body.email}, (err, doc) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (doc) {
      res.json('this email has been registered before');
    } else {
      var md5 = crypto.createHash('md5');
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: md5.update(req.body.password).digest('hex'),
        position: req.body.position
      }, (err, user) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.send(user);
        }
      });
    }
  });


});


//login
app.post('/api/login', (req, res) => {
  User.findOne({email:req.body.email}, (err, doc) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else if(!doc){
      res.json('email or password incorrect');
    }else{
      var md5 = crypto.createHash('md5');
      if(md5.update(req.body.password).digest('hex') != doc.password){
        res.json('email or password incorrect');
      }else{
        req.session.email = req.body.email;
        res.json('success');
      }
    }
  });
});

app.get('/api/checkLogin', (req, res) => {
  if(req.session.email){
    res.json(true);
  }else{
    res.json(false);
  }
});

app.get('/api/logOut', (req, res) => {
  req.session.email = null;
  res.sendStatus(200);
});

app.get('/api/user', (req, res) => {
  var email = req.session.email;
  User.findOne({email: email}, (err, doc){
    if(err){
      console.log(err);
    }else{
      res.json(doc);
    }
  });
});



app.post('/api/submitFeedback',(req, res) => {
  Feedback.create({
    user: req.body.user,
    content: req.body.feedback
  }, (err, feedback) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      res.send(feedback);
    }
  });
});

app.post('/api/getFeedback', (req, res) => {
  if(req.body.position == "Admin"){
    Feedback.find({},(err, feedback) => {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(feedback);
      }
    });
  }else if(req.body.position == "Staff"){
    Feedback.find({'user.email' : req.body.email}, (err, feedback) => {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else {
        res.json(feedback);
      }
    });
  }

});


app.post('/api/changePwd', (req, res) => {
  User.findOne({email: req.body.email}, (err, doc) => {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      if(crypto.createHash('md5').update(req.body.oldPassword).digest('hex') == doc.password){
        User.update({email: req.body.email},{ $set:{
          password: crypto.createHash('md5').update(req.body.password).digest('hex')
        }}, (err, rawResponse) => {
          if(err){
            console.log(err);
            res.sendStatus(500);
          }else {
            res.json(rawResponse);
          }
        });
      }else {
        res.json('old password incorrect');
      }
    }
  });
});










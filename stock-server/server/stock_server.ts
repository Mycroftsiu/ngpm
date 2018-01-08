/**
 * Created by mycroft on 2018/1/1.
 */
import * as express from 'express';


const app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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
var Person = require('../build/user');

mongoose.connect('mongodb://localhost/db1');
mongoose.connection.on('connected',function () {
  console.log('database connect successfully')
});


Person.create([
  { name: "Mycroft", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 12345678 },
  { name: "Danny", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 12312338 },
  { name: "Joe", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 41235678 },
  { name: "Edmond", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 47983678 }
]);

//get person list
app.get('/api/person', (req, res) => {
  Person.find({}, (err, response) => {
    if (err) console.log(err);
    else res.json(response);
  });
});

//get single person on person form
app.get('/api/person/:id',(req, res) => {
  Person.findById(req.params.id, (err, response) => {
    if (err) console.log(err);
    else res.json(response);
  });
});

//update single person
app.post('/api/person/:id', (req, res) => {
  Person.update({_id:req.params.id},{ $set: {
      name: req.body.name,
      age: req.body.age[0],
      gender: req.body.gender,
      department: req.body.department,
      phone: req.body.phone[0],
      degree: req.body.degree,
      jobNumber: req.body.jobNumber[0]
  }}, (err, rawResponse) => {
    if(err) console.log(err);
    res.send(rawResponse);
  })
});

//delete single person
app.delete('/api/person/:id',(req, res) => {
    Person.remove({_id: req.params.id}, (error, response) => {
    if(error) console.log(error);
    else{
      res.send({success:1, response: response});
    };
  });
});



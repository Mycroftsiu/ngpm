"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mycroft on 2018/1/1.
 */
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, function () {
    console.log('Server have been started with address: "http://localhost:8000" ');
});
app.get('/api/stock', function (req, res) {
    var result = stocks;
    var params = req.query;
    if (params.name) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name); });
    }
    res.json(result);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "HSBC", 75, 4.0, "Banking Corporation", ["Finance"]),
    new Stock(2, "APPLE", 300, 4.5, "Leading company", ["TECH", "IT"]),
    new Stock(3, "TENCENT", 160, 4.0, "Social Message", ["IT"]),
    new Stock(4, "Alibaba", 100, 4.0, "E-commerce", ["IT"]),
    new Stock(5, "GOOGLE", 200, 4.0, "Search Engine", ["IT"]),
    new Stock(6, "ChinaLife", 75, 3.5, "Motor Corporation", ["Insurance"])
];
var mongoose = require('mongoose');
var Person = require('../model/person');
var User = require('../model/user');
mongoose.connect('mongodb://localhost/db1');
mongoose.connection.on('connected', function () {
    console.log('database connect successfully');
});
// Person.create([
//   { name: "Mycroft", gender: "Male", age: 42, phone: 13221752117, department: "Information Technology", degree: "Bachelor", jobNumber: 12345678 },
//   { name: "Danny", gender: "Male", age: 33, phone: 13726879258, department: "Accounting and Finance", degree: "Doctor", jobNumber: 12312338 },
//   { name: "Joe", gender: "Male", age: 55, phone: 13846252197, department: "Production and Quality Assurance", degree: "Doctor", jobNumber: 41235678 },
//   { name: "Edmond", gender: "Male", age: 19, phone: 15921752230, department: "Research and Development", degree: "Master", jobNumber: 47983678 }
// ]);
//get person list
app.get('/api/person', function (req, res) {
    Person.find({}, function (err, response) {
        if (err)
            console.log(err);
        else
            res.json(response);
    });
});
//get single person on person form
app.get('/api/person/:id', function (req, res) {
    Person.findById(req.params.id, function (err, response) {
        if (err)
            console.log(err);
        else
            res.json(response);
    });
});
//update single person
app.post('/api/person/:id', function (req, res) {
    Person.update({ _id: req.params.id }, { $set: {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            department: req.body.department,
            phone: req.body.phone,
            degree: req.body.degree,
            jobNumber: req.body.jobNumber
        } }, function (err, rawResponse) {
        if (err)
            console.log(err);
        res.send(rawResponse);
    });
});
// create a new person
app.post('/api/personCreate', function (req, res) {
    if (req.body != null) {
        Person.create({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            phone: req.body.phone,
            department: req.body.department,
            degree: req.body.degree,
            jobNumber: req.body.jobNumber
        });
        res.send({ success: 1 });
    }
});
//delete single person
app.delete('/api/person/:id', function (req, res) {
    Person.remove({ _id: req.params.id }, function (error, response) {
        if (error)
            console.log(error);
        else {
            res.send({ success: 1, response: response });
        }
        ;
    });
});
//account setting
app.post('/api/createAccount', function (req, res) {
    if (req.body != null) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        res.send('create account successfully');
    }
});

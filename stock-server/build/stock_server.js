"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mycroft on 2018/1/1.
 */
var express = require("express");
var app = express();
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
//
//
//
//
var mongoose = require('mongoose');
var Person = require('../build/user');
mongoose.connect('mongodb://localhost/db1');
mongoose.connection.on('connected', function () {
    console.log('connect successfully');
});
Person.create([
    { name: "Mycroft", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 12345678 },
    { name: "Danny", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 12312338 },
    { name: "Joe", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 41235678 },
    { name: "Edmond", gender: "Male", age: 21, phone: 51938273, department: "IT", degree: "Bachelor", jobNumber: 47983678 }
]);
var result;
setTimeout(function () {
    Person.find({}, function (err, res) {
        if (err) {
            console.log('err');
        }
        else {
            result = res;
        }
    });
}, 100);
app.get('/api/person', function (req, res) {
    res.json(result);
});

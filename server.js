const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Datastore = require('nedb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

db = {}
db.database = new Datastore('./data.db');
db.users = new Datastore('./users.db');
db.database.loadDatabase();
db.users.loadDatabase();

db.database.ensureIndex({fieldName: 'name', unique: true}, function (err) {
    if (err) console.log(err);
});
db.users.ensureIndex({fieldName: 'userName', unique: true}, function (err) {
    if (err) return;
});
// const blogPost = require('./data');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('tiny'));


app.get('/api/getVeggies', (req, res) => {
    db.database.find({}, function (err, data) {
        if (err) {
            res.end();
            return;
        }
        // res.json(data);
        res.send({veggies: data})
        console.log('data: ', data)
        console.log('data[0].nutrition[0]: ', data[0].nutrition)
    });

});

app.post('/api/save', (req, res) => {
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.database.insert(data);
    res.json({
        status: "response success",
    });

});

app.post('/api/login', (req, res) => {
    console.log(req.body);
    db.users.findOne({email: req.body.email}, function (err, data) {
        if (err) throw err;
        if (data != null && data.password === req.body.password) {
            res.send({
                status: "OK",
                token: data.userName
            })
        } else {
            res.send({
                status: "fail",
                token: req.email,
            })
        }
    })
});

app.post('/api/veggies/:id/updateNutrition', (req, res) => {
    const vegName = req.body.vegName;
    const query = {name: vegName};
    const value = {$set: {nutrition: req.body.nutritions}};
    db.database.update(query, value, {upsert: true}, function (err, data) {
            if (err) throw err;
            res.send({nutritions: req.body.nutritions});
            db.database.persistence.compactDatafile();
            // db.end();
        }
    )
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

const cucumber = {
    name: "Cucumber",
    img: "https://d2d8wwwkmhfcva.cloudfront.net/800x/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_5c2377d5-9e8d-46a5-bdc2-ec816cd84b62.jpeg",
    // wiki:'https://en.wikipedia.org/wiki/Cucumber',
    nutrition: [
        {title: "Energy", value: "16g"},
        {title: "Fat", value: "0.11g"}]
};

const tomato = {
    name: "Tomato",
    img: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/98055.jpg",
// wiki:'https://en.wikipedia.org/wiki/Tomato',
    nutrition: [
        {title: "Energy", value: "18g"},
        {title: "Fat", value: "0.2g"}]
};

db.database.insert([cucumber, tomato]);
db.users.insert({userName: "Chen", password: "12345", email: "chen@chen.com"});
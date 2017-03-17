var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    models = require('./models');

var userRoute = require('./routes/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', userRoute);

models.sequelize.sync().then(function () {
    app.listen(3000);
    console.log("Started !");
});
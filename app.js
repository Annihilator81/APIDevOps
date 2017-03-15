var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    models = require('./models');

// Custom middlewares
//var token = require('./definitions/token');

// Définitions des routes
//var authRoute = require('./routes/auth');
var userRoute = require('./routes/user');
/*var movieRoute = require('./routes/movie');
var categoryRoute = require('./routes/category');
var commentRoute = require('./routes/comment');
var friendshipRoute = require('./routes/friendship');
var personRoute = require('./routes/person');
var searchRoute = require('./routes/search');*/

app.use(bodyParser.json());

// Handle POST requests
app.use(bodyParser.urlencoded({extended: true}));

// Route placée avant la vérification du token
//app.use('/auth', authRoute);

// Token middleware
//app.use(token.check());

app.use('/users', userRoute);/*
app.use('/movies', movieRoute);
app.use('/categories', categoryRoute);
app.use('/comments', commentRoute);
app.use('/friendships', friendshipRoute);
app.use('/persons', personRoute);
app.use('/search',searchRoute);*/

models.sequelize.sync().then(function () {
    app.listen(3000);
    console.log("Started !");
});
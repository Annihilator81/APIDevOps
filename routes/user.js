var app = require('express'),
    models = require('../models'),
    router = app.Router();

router.get('/', function(req, res) {
    models.User.findAll().then(function(users) {
        res.json(users);
    });
});

router.get('/bought', function(req, res) {
    models.User.findById(req.query.id, {
        include: [{
            model: models.Movie,
            as: 'movies',
            through: { attributes: [] }
        }]
    }).then(function(user) {
        res.json(user);
    });
});

router.delete('/:id', function(req, res){
    models.User.findById(req.params.id).then(function (user){
        user.destroy().then(function (status){
            res.status(200);
            res.json();
        });
    });
});

module.exports = router;
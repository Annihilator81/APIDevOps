/**
 * Created by lucas on 11/03/2016.
 */
var app = require('express'),
    models = require('../models'),
    router = app.Router();

 /**
 * @api {get} /users/ Retourne tous les utilisateurs enregistrés.
 * @apiName GetAll
 * @apiGroup Users
 *
 * @apiSuccess {Object} Users Une liste d'utilisateurs.
 */
router.get('/', function(req, res) {
    models.User.findAll().then(function(users) {
        res.json(users);
    });
});

/**
 * @api {get} /users/bought?id=:id Retourne les films achetés par l'utilisateur
 * @apiName GetBought
 * @apiGroup Users
 *
 * @apiParam {Number} ID ID de l'utilisateur
 *
 * @apiSuccess {Object} Films Une liste de films.
 */
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

/**
 * @api {delete} /users/:id Suppression d'un utilisateur.
 * @apiName Delete
 * @apiGroup Users
 *
 * @apiSuccess {Object} None Null
 */
router.delete('/:id', function(req, res){
    models.User.findById(req.params.id).then(function (user){
        user.destroy().then(function (status){
            res.status(200);
            res.json();
        });
    });
});

module.exports = router;
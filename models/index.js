var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('bank', 'root', '', {
    'dialect': 'mysql',
    'host': "localhost",
    "port": "3306"
});
var db        = {};
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    //console.log(sequelize);
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
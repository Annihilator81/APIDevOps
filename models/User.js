module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            name: DataTypes.STRING,
        },
        {
            tableName: 'user',
            underscored: true,
            classMethods: {
                /*associate: function(models) {
                    User.belongsToMany(models.User, {
                        through: 'category_movie',
                        foreignKey: 'category_id',
                        as: 'movies'
                    });
                }*/
            }
        });

    return User;
};
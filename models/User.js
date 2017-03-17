module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            name: DataTypes.STRING,
            money: DataTypes.STRING,
        },
        {
            tableName: 'user',
            underscored: true,
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Transaction, {as: "transactions"});
                }
            }
        });

    return User;
};
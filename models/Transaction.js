
module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
            cardNumber: DataTypes.STRING,
            cardExpiration: DataTypes.STRING,
            cardPictogram: DataTypes.STRING,
            total: DataTypes.INTEGER
        },
        {
            tableName: 'transaction',
            underscored: true,
            classMethods: {
                /*associate: function(models) {
                    Transaction.belongsTo(models.User, {
                        through: 'user_transaction',
                        foreignKey: 'user_fk',
                        as: 'transactions'
                    });
                }*/
            }
        });

    return Transaction;
};
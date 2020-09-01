module.exports = (sequelize, dataTypes) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderNumber: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'cart'
    });

    Cart.associate = (models) => {
        Cart.hasMany(models.items, {
            as: "items",
            foreignKey: "cartId",
          });
          Cart.belongsTo(models.users, {
            as: "user",
            foreignKey: "userId",
          });
    };
    return Cart
};
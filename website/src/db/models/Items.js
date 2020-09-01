module.exports = (sequelize, dataTypes) => {
    const Item = sequelize.define('items', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        salePrice: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
        qty: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        subTotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },

        state: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        productSku: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        cartId: {
            type: dataTypes.INTEGER,
        }
    }, {
        tableName: 'items'
    });

    Item.associate = (models) => {
        Item.belongsTo(models.cart, {
            as: "cart",
            foreignKey: "cartId",
          });

          Item.belongsTo(models.users, {
            as: "user",
            foreignKey: "userId",
          });
        
          Item.belongsTo(models.products, {
            as: "products",
            foreignKey: "productSku",
          });
    };
    return Item
};
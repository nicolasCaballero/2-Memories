module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('products', {
        sku: {
            type: dataTypes.INTEGER,
            primaryKey: TRUE,
            autoIncrement: TRUE,
            allowNull: FALSE
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        visibility: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.INTEGER
        },
        specialPrice: {
            type: dataTypes.INTEGER
        },
        qty: {
            type: dataTypes.INTEGER
        },
        categoryId: {
            type: dataTypes.INTEGER
        }
    }, {
        tableName: 'products'
    });
    return Product
};
module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define('products', {
        sku: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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
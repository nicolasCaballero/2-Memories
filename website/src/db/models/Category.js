module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('categories', {
        id: {
            primaryKey: TRUE,
            type: dataTypes.INTEGER,
            autoIncrement: TRUE,
            allowNull: FALSE
        },
        name: {
            type: dataTypes.STRING
        },
        image: {
            type: dataTypes.STRING
        },
        visibility: {
            type: dataTypes.STRING
        }
    }, {
        tableName: 'categories'
    });
    return Category
};
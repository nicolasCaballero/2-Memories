module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('categories', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
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
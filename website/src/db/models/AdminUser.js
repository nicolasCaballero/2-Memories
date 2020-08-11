module.exports = (sequelize, dataTypes) => {
    const AdminUser = sequelize.define('AdminUsers', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: TRUE,
            autoIncrement: TRUE,
            allowNull: FALSE
        },
        name: {
            type: dataTypes.STRING
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        role: {
            type: dataTypes.INTEGER
        },
        photo: {
            type: dataTypes.STRING
        }
    }, {
        tableName: 'adminuser'
    });
    return AdminUser
};
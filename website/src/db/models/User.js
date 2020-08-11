module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: TRUE,
            autoIncrement: TRUE,
            allowNull: FALSE
        },
        name: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        photo: {
            type: dataTypes.STRING
        }
    }, {
        tableName: 'users'
    });
    return User
};
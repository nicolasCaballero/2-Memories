module.exports = (sequelize, dataTypes) => {
    const Experience = sequelize.define('experiences', {
        id: {
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
        include: {
            type: dataTypes.STRING
        },
        website: {
            type: dataTypes.STRING
        },
        productSku: {
            type: dataTypes.INTEGER
        }
    }, {
        tableName: 'experiences'
    });

    Experience.associate = (models) => {
        Experience.belongsTo(models.products, {
            as: 'experienceProducts',
            foreignKey: 'productSku'
        });
    };
    return Experience
};
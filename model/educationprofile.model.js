const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('IdeaMan', 'postgres', '12345', { 'host': 'localhost', 'dialect': 'postgres' })

const EducationProfileModel = sequelize.define('EducationProfile', {
    Education_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    Profile_id:
    {
        type: DataTypes.BIGINT,
        references: {
            model: "PersonalProfile",
            key: "Profile_id"
        },
        allowNull: false
    },
    Class10_schoolname:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    Class12_schoolname:
    {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    Class10_percentage:
    {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
    ,
    Class12_percentage:
    {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Degree:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    Specialization:
    {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
module.exports = EducationProfileModel
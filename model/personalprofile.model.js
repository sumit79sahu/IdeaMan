const {Sequelize,DataTypes}=require('sequelize')
const sequelize=new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})
const EducationProfileModel=require('./educationprofile.model')
const IdeaModel =require('./idea.model')
const PersonalProfileModel=sequelize.define('PersonalProfile',{
    Profile_id:
    {
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    Address:
    {
        type:DataTypes.STRING
    },
    Gender:
    {
        type:DataTypes.STRING,
        // allowNull:false
    },
    City_id:
    {
        type:DataTypes.BIGINT,
        references:{
            model:'City',
            key:'City_id'
        }
    },  
    DateofBirth:
    {
        type:DataTypes.DATE,
        // allowNull:false
    },
    Profile_picture:
    {
        type:DataTypes.STRING
    },
    
    User_alternativemobileno:
         {
             type:DataTypes.NUMBER
         },
    User_email:{
        type:DataTypes.STRING,
        allowNull:false,
        references: {
            model: 'Registration',
            key: 'User_email', 
         }}},
    {
        freezeTableName:true,
        timestamps:false,
        createdAt:false,
        updatedAt:false
    }
)
PersonalProfileModel.hasOne(EducationProfileModel,{foreignKey:'Profile_id',foreignKeyConstraint:true})
PersonalProfileModel.hasMany(IdeaModel,{foreignKey:'Profile_id',foreignKeyConstraint:true})
module.exports =PersonalProfileModel

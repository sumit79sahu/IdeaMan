const {Sequelize,DataTypes}=require('sequelize');
const sequelize= new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})
const PersonalProfileModel=require('./personalprofile.model')
const RegistrationModel=sequelize.define('Registration',{
    User_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    User_mobileno:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true
    },
    User_email:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    User_password:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }},
    {
        freezeTableName:true,
        timestamps:false,
        createdAt:false,
        updatedAt:false
    }
)
RegistrationModel.hasOne(PersonalProfileModel,{foreignKey:'User_email',foreignKeyConstraint:true})
module.exports=RegistrationModel
const {Sequelize,DataTypes}=require('sequelize');
const sequelize= new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})
const CityModel=require('./city.model')
const StateModel=sequelize.define('State',{
    State_id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    State_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    State_icon:{
        type:DataTypes.STRING
    },
    State_description:{
        type:DataTypes.STRING
    }},
    {
        freezeTableName:true,
        timestamps:false,
        createdAt:false,
        updatedAt:false
    }
)
StateModel.hasMany(CityModel,{foreignKey:"State_id",foreignKeyConstraint:true})
module.exports=StateModel
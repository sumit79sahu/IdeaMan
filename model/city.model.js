const {DataTypes,Sequelize} =require('sequelize')
// const StateModel = require('./state.model')
const PersonalProfileModel=require('./personalprofile.model')
const sequelize=new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})

const CityModel=sequelize.define('City',{    
    State_id:{
        type:DataTypes.BIGINT,
        references: {
            model: 'State',
            key: 'State_id', 
         }
    },
    City_id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
}
,
City_name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
},
City_pincode:{
    type:DataTypes.BIGINT,
    allowNull:false,
    unique:true
}
,
City_icon:{
    type:DataTypes.STRING
},
City_description:{
    type:DataTypes.STRING
}},
{
    freezeTableName:true,
    timestamps:false,
    createdAt:false,
    updatedAt:false
})
CityModel.hasMany(PersonalProfileModel,{foreignKey:"City_id",foreignKeyConstraint:true})
module.exports=CityModel

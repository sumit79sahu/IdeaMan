const {DataTypes,Sequelize} =require('sequelize')
const sequelize=new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})

const SubcategoryModel=sequelize.define('SubCategory',{    
    Category_id:{
        type:DataTypes.BIGINT,
        references: {
            model: 'Category',
            key: 'Category_id', 
         }
    },
    Subcategory_id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true
}
,
Subcategory_name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
},
Subcategory_icon:{
    type:DataTypes.STRING
},
Subcategory_description:{
    type:DataTypes.STRING
}},
{
    freezeTableName:true,
    timestamps:false,
    createdAt:false,
    updatedAt:false
})
module.exports=SubcategoryModel

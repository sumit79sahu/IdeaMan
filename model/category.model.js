const {Sequelize,DataTypes}=require('sequelize');
const sequelize= new Sequelize('IdeaMan','postgres','12345',{'host':'localhost','dialect':'postgres'})
const SubcategoryModel=require('./subcategory.model')
const CategoryModel=sequelize.define('Category',{
    Category_id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    Category_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Category_icon:{
        type:DataTypes.STRING
    },
    Category_description:{
        type:DataTypes.STRING
    }},
    {
        freezeTableName:true,
        timestamps:false,
        createdAt:false,
        updatedAt:false
    }
)
CategoryModel.hasMany(SubcategoryModel,{foreignKey:'Category_id',foreignKeyConstraint:true})
module.exports=CategoryModel
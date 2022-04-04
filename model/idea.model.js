const {DataTypes,Sequelize}=require('sequelize')
const sequelize=new Sequelize('IdeaMan', 'postgres', '12345', { 'host': 'localhost', 'dialect': 'postgres' })
const IdeaModel=sequelize.define('Idea',{
    Profile_id:{
        type: DataTypes.BIGINT,
        references: {
            model: "PersonalProfile",
            key: "Profile_id"
        },
        allowNull: false
    },
    Idea_id:
    {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    Subcategory_id:
    {
        type:DataTypes.BIGINT,
        references:
        {
            model:"SubCategory",
            key:"Subcategory_id"
        },
        allowNull:false
    },
    Idea_title:
    {
        type:DataTypes.STRING,
        allowNull:false
    },
    Idea_description:
    {
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
module.exports=IdeaModel
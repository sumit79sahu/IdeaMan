const {Sequelize,DataTypes}=require('sequelize')
const sequelize=new Sequelize('IdeaMan', 'postgres', '12345', { 'host': 'localhost', 'dialect': 'postgres' })
const IdeaLikeModel=sequelize.define('IdeaLike',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    Profile_id:{
        type:DataTypes.BIGINT,
        references: {
            model: "PersonalProfile",
            key: "Profile_id"
        },
        allowNull: false
    },
    Idea_id:{
        type:DataTypes.BIGINT,
        references: {
            model: "Idea",
            key: "Idea_id"
        },
        allowNull: false
    },
    like:{
        type:DataTypes.STRING
    },
    comment:{
        type:DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
module.exports=IdeaLikeModel
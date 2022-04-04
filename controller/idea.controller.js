// const { Model } = require("sequelize/types");
const IdeaModel=require("../model/idea.model");
const PersonalProfileModel = require("../model/personalprofile.model");
const RegistrationModel=require("../model/registration.model")
const InsertUserIdea=async(ideaData)=>
{
    try {
        const result=await IdeaModel.create(ideaData);
        return result   
    } catch (error) {
        return error
    }
}
const ShowUserIdea=async(id)=>
{
    try {
        const result=await IdeaModel.findAll({where:{Profile_id:id}});
        return result   
    } catch (error) {
        console.log(error)
        return error
    }
}
const ShowAllUserIdea=async()=>
{
    try {
        const result=await RegistrationModel.findAll({include:[{model:PersonalProfileModel,required:true,include:[{model:IdeaModel,required:true}]}]})
        return result
    } catch (error) {
        console.log(error)
        return error     
    }
}
const UpdateUserIdea=async(ideaData,ideaId)=>
{
    try {
        const result=await IdeaModel.update(ideaData,{where:{Idea_id:ideaId}});
        return result
    } catch (error) {
        return error
    }
}
const DeleteUserIdea=async(ideaId)=>
{
    try {
        const result=await IdeaModel.destroy({where:{Idea_id:ideaId}});
        return result
    } catch (error) {
        return error
    }
}

module.exports={InsertUserIdea,ShowUserIdea ,ShowAllUserIdea,UpdateUserIdea,DeleteUserIdea}

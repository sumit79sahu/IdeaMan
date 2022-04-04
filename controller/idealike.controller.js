const IdeaLikeModel=require('../model/idealike.model')
const { Op } = require("sequelize");
const InsertLike=async(data)=>
{
    try {
        const result=IdeaLikeModel.create(data)
        return result
    } catch (error) {
        return error
    }
}

const ShowLike=async()=>
{
    try {
        const result=IdeaLikeModel.count()
        return result
    } catch (error) {
        return error
    }
}
const DeleteLike=async(pid,iid)=>
{
    try {
        constresult=IdeaLikeModel.destroy({where:{Profile_id:pid,
            Idea_id: iid
        }})
    } catch (error) {
        
    }
}

const UpdateLike=async()=>
{
    try {
        
    } catch (error) {
        
    }
}
module.exports={InsertLike,ShowLike,UpdateLike,DeleteLike}
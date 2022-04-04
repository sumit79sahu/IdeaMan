const EducationProfileModel=require('../model/educationprofile.model')
const InsertUserEducationData=async(userEducationData)=>
{
    try 
    {
        // console.log(UserData)
        const result=await EducationProfileModel.create(userEducationData)
        return result     
    } 
    catch (error) {
        console.log(error)
        return error
        
    }
}

const ShowUserEducationData=async()=>
{
    try 
    {
        const result=await EducationProfileModel.findAll();
        return result     
    } 
    catch (error) {
        return error
        
    }
}
// const ShowUserEducationData=async(userId)=>
// {
//     try {
//         const result=await EducationProfileModel.findAll({attributes:['User_email','User_name','User_password'] ,where:{User_email:userEmail}})
//         return result
//     } catch (error) {
//         return error
//     }
// }
const DeleteUserEducationData=async(userEducationId)=>
{
    try 
    {
        const result=await EducationProfileModel.destroy({where:{Education_id:userEducationId}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateUserEducationData=async(userEducationData,userId)=>
{
    try {
        console.log(userEducationData)
        const result=await EducationProfileModel.update(userEducationData,{where:{Education_id:userId}});
        console.log(result)
        return result
        
    } catch (error) {
        console.log(error)
    }
}
module.exports={InsertUserEducationData,ShowUserEducationData,DeleteUserEducationData,UpdateUserEducationData}
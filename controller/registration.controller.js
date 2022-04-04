const RegistrationModel=require('../model/registration.model')
const InsertUserData=async(userData)=>
{
    try 
    {
        // console.log(UserData)
        const result=await RegistrationModel.create(userData)
        return result     
    } 
    catch (error) {
        return error
        
    }
}

const ShowUserData=async()=>
{
    try 
    {
        const result=await RegistrationModel.findAll();
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const ShowUserLoginData=async(userEmail)=>
{
    try {
        const result=await RegistrationModel.findAll({attributes:['User_email','User_name','User_password'] ,where:{User_email:userEmail}})
        return result
    } catch (error) {
        return error
    }
}
const DeleteUserData=async(userEmail)=>
{
    try 
    {
        const result=await RegistrationModel.destroy({where:{User_email:userEmail}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateUserData=async(userData,userEmail)=>
{
    try {
        const result=await RegistrationModel.update(userData,{where:{User_email:userEmail}});
        return result
        
    } catch (error) {
        
    }
}
module.exports={InsertUserData,ShowUserData,ShowUserLoginData,DeleteUserData,UpdateUserData}
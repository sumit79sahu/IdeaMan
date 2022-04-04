const StateModel=require('../model/state.model')

const InsertStateData=async(stateData)=>
{
    try 
    {
        // console.log(stateData)
        const result=await StateModel.create(stateData)
        return result     
    } 
    catch (error) {
        return error
        
    }
}

const ShowStateData=async()=>
{
    try 
    {
        const result=await StateModel.findAll()
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const ShowUserStateData=async(stateId)=>
{
    try 
    {
        const result=await StateModel.findAll({where:{State_id:stateId}})
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const DeleteStateData=async(stateId)=>
{
    try 
    {
        const result=await StateModel.destroy({where:{State_id:stateId}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateStateData=async(stateData,stateId)=>
{
    try {
        const result=await StateModel.update(stateData,{where:{State_id:stateId}});
        return result
        
    } catch (error) {
        
    }
}

module.exports={InsertStateData,ShowStateData,ShowUserStateData,DeleteStateData,UpdateStateData}
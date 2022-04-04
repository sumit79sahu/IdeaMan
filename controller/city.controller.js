const CityModel = require("../model/city.model")
const StateModel=require("../model/state.model")
const InsertCityData=async(cityData)=>
{
    try 
    {
        // console.log(CityModel)
        const result=await CityModel.create(cityData)
        return result     
    } 
    catch (error) {
        return error
        
    }
}

const ShowCityData=async()=>
{
    try 
    {
        const result=await CityModel.findAll()
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const UserCityData=async(stateId)=>
{
    try {
        const result=await StateModel.findAll({include:[{model:CityModel,required:true ,attributes:['City_name','City_pincode','City_id'] ,where:{State_id:stateId}}],attributes:['State_name']})
        const [a]=result
        return a.Cities
    } catch (error) {
        return error
    }
}
const ShowUserCityData=async(cityId)=>
{
    try {
        const result=await CityModel.findAll({where:{City_id:cityId}})
        return result 
    } catch (error) {
        return error
    }
}
const DeleteCityData=async(cityId)=>
{
    try 
    {
        const result=await CityModel.destroy({where:{City_id:cityId}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateCityData=async(cityData,cityId)=>
{
    try {
        const result=await CityModel.update(cityData,{where:{City_id:cityId}});
        return result
        
    } catch (error) {
        
    }
}

module.exports={InsertCityData,ShowCityData,UserCityData,ShowUserCityData,DeleteCityData,UpdateCityData}
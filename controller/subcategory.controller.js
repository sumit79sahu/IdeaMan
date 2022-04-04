const SubcategoryModel = require("../model/subcategory.model")
const CategoryModel=require("../model/category.model")
const InsertSubcategoryData=async(subcategoryData)=>
{
    try 
    {
        // console.log(stateData)
        const result=await SubcategoryModel.create(subcategoryData)
        return result     
    } 
    catch (error) {
        console.log(error)
        return error
        
    }
}

const ShowSubcategoryData=async()=>
{
    try 
    {
        const result=await SubcategoryModel.findAll()
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const ShowUserSubcategoryData=async(id)=>
{
    try {
        const result=await CategoryModel.findAll({ attributes:['Category_name'], include:[{model:SubcategoryModel ,required:true ,attributes:['Subcategory_id','Subcategory_name']}] ,where:{Category_id:id}})
        const [a]=result
        return a.SubCategories
    } catch (error) {
        return error
    }
}
const DeleteSubcategoryData=async(subcategoryId)=>
{
    try 
    {
        const result=await SubcategoryModel.destroy({where:{Subcategory_id:subcategoryId}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateSubcategoryData=async(subcategoryData,subcategoryId)=>
{
    try {
        const result=await SubcategoryModel.update(subcategoryData,{where:{Subcategory_id:subcategoryId}});
        return result
        
    } catch (error) {
        
    }
}

module.exports={InsertSubcategoryData,ShowSubcategoryData,ShowUserSubcategoryData,DeleteSubcategoryData,UpdateSubcategoryData}
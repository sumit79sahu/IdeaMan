const CategoryModel=require('../model/category.model')

const InsertCategoryData=async(categoryData)=>
{
    try 
    {
        // console.log(CategoryData)
        const result=await CategoryModel.create(categoryData)
        return result     
    } 
    catch (error) {
        return error
        
    }
}

const ShowCategoryData=async()=>
{
    try 
    {
        const result=await CategoryModel.findAll()
        return result     
    } 
    catch (error) {
        return error
        
    }
}
const DeleteCategoryData=async(categoryId)=>
{
    try 
    {
        const result=await CategoryModel.destroy({where:{Category_id:categoryId}});
        return result
    } 
    catch (error) {
        // console.log(error)
        return error
        
    }
}
const UpdateCategoryData=async(categoryData,categoryId)=>
{
    try {
        const result=await CategoryModel.update(categoryData,{where:{Category_id:categoryId}});
        return result
        
    } catch (error) {
        
    }
}
module.exports={InsertCategoryData,ShowCategoryData,DeleteCategoryData,UpdateCategoryData}
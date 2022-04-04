const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const {InsertStateData,ShowStateData,ShowUserStateData,DeleteStateData,UpdateStateData}=require('./controller/state.controller');
const {InsertCityData,ShowCityData,UserCityData,ShowUserCityData,DeleteCityData,UpdateCityData}=require('./controller/city.controller');
const {InsertCategoryData,ShowCategoryData,DeleteCategoryData,UpdateCategoryData} =require('./controller/category.controller')
const {InsertSubcategoryData,ShowSubcategoryData,ShowUserSubcategoryData,DeleteSubcategoryData,UpdateSubcategoryData} =require('./controller/subcategory.controller')
const {InsertUserData,ShowUserData,ShowUserLoginData,DeleteUserData,UpdateUserData} =require('./controller/registration.controller')
const {InsertUserEducationData,ShowUserEducationData,DeleteUserEducationData,UpdateUserEducationData} =require('./controller/educationprofile.controller')
const {InsertUserPersonalProfileData,ShowProfileData,ShowUserPersonalProfileData,DeleteUserPersonalProfileData,UpdateUserPersonalProfileData} =require('./controller/personalprofile.controller')
const {GetDetails}=require('./controller/dashboard.contoller');
const {InsertUserIdea,ShowUserIdea,ShowAllUserIdea,UpdateUserIdea,DeleteUserIdea}=require('./controller/idea.controller');
const {InsertLike,ShowLike,UpdateLike,DeleteLike}=require('./controller/idealike.controller');
// #################################################State#############################################################
app.post('/state',async(req,res)=>{
    try {
        const result=await InsertStateData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/state',async(req,res)=>{
    try {
        const result=await ShowStateData()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.get('/state/:id',async(req,res)=>{
    try {
        const result=await ShowUserStateData(req.params.id)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/state/:id',async(req,res)=>{
    try {
        const result =await DeleteStateData(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/state/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateStateData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// ###################################city##########################################
app.post('/city',async(req,res)=>{
    try {
        const result=await InsertCityData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/city',async(req,res)=>{
    try {
        const result=await ShowCityData()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.get('/city/:id',async(req,res)=>{
    try {
        const result=await ShowUserCityData(req.params.id)
        // console.log(result)
        res.json(result)

    } catch (error) {
        console.log(error)
        
    }
})
app.get('/usercity/:id',async(req,res)=>
{
    try {
        const result=await UserCityData(req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.delete('/city/:id',async(req,res)=>{
    try {
        const result =await DeleteCityData(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/city/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateCityData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// ##################################category####################################################
app.post('/category',async(req,res)=>{
    try {
        const result=await InsertCategoryData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/category',async(req,res)=>{
    try {
        const result=await ShowCategoryData()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/category/:id',async(req,res)=>{
    try {
        const result =await DeleteCategoryData(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/category/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateCategoryData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// #################################################subcategory#############
app.post('/subcategory',async(req,res)=>{
    try {
        const result=await InsertSubcategoryData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/subcategory',async(req,res)=>{
    try {
        const result=await ShowSubcategoryData()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.get('/subcategory/:id',async(req,res)=>{
    try {
        const result=await ShowUserSubcategoryData(req.params.id)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/subcategory/:id',async(req,res)=>{
    try {
        const result =await DeleteSubcategoryData(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/subcategory/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateSubcategoryData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// #########################Dashbord############################
app.get('/dashboard',async(req,res)=>{
    try {
        const result=await GetDetails()
        console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
// ############################registration###############################
app.post('/registration',async(req,res)=>{
    try {
        console.log(req.body)
        const result=await InsertUserData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/registration',async(req,res)=>{
    try {
        const result=await ShowUserData(req.params.id)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.get('/registration/:email',async(req,res)=>{
    try {
        const result=await ShowUserLoginData(req.params.email)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/registration/:email',async(req,res)=>{
    try {
        const result =await DeleteUserData(req.params.email);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/registration/:email',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateUserData(req.body,req.params.email)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// #####################Personal Profile#########################################
app.post('/personalprofile',async(req,res)=>
{
    try {
        const result=await InsertUserPersonalProfileData(req.body)
        res.json(result)
    } catch (error) {
        return error
    }
})
app.get('/personalprofile',async(req,res)=>
{
    try {
        const result=await ShowProfileData();
        res.json(result)
        // console.log(result)

        res.json(result)
    } catch (error) {
        return error
        // console.log(error)
    }
})
app.get('/personalprofile/:userEmail',async(req,res)=>
{
    try {
        const result=await ShowUserPersonalProfileData(req.params.userEmail);
        res.json(result)
        // console.log(result)

        res.json(result)
    } catch (error) {
        return error
        // console.log(error)
    }
})
app.delete('/personalprofile/:id',async(req,res)=>
{
    try{
        const result=await DeleteUserPersonalProfileData(req.params.id)
        res.json(result)
    }
    catch(error)
    {
        return error
    }
}
)
app.put('/personalprofile/:id',async(req,res)=>
{
    try {
        const result=await UpdateUserPersonalProfileData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        return error
    }
})
// ########################################Education####################################
app.post('/education',async(req,res)=>{
    try {
        console.log(req.body)
        const result=await InsertUserEducationData(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/education',async(req,res)=>{
    try {
        const result=await ShowUserEducationData(req.params.id)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
// app.get('/education/:id',async(req,res)=>{
//     try {
//         const result=await ShowUserEducatonLoginData(req.params.id)
//         // console.log(result)
//         res.json(result)
//     } catch (error) {
//         console.log(error)
        
//     }
// })
app.delete('/education/:id',async(req,res)=>{
    try {
        const result =await DeleteUserEducationData(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/education/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateUserEducationData(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// ############################Idea###########
app.post('/idea',async(req,res)=>{
    try {
        console.log(req.body)
        const result=await InsertUserIdea(req.body)
        res.json(result)
        
    } catch (error) {
        console.log(error)
        
    }    
})

app.get('/idea/:id',async(req,res)=>{
    try {
        const result=await ShowUserIdea(req.params.id)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})

app.get('/allidea',async(req,res)=>{
    try {
        const result=await ShowAllUserIdea()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/idea/:id',async(req,res)=>{
    try {
        const result =await DeleteUserIdea(req.params.id);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.put('/idea/:id',async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.params.id)
        const result=await UpdateUserIdea(req.body,req.params.id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
// #####################like####################
app.post('/like',async(req,res)=>{
    try {
        const result=await InsertLike(req.body)
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})

app.get('/like',async(req,res)=>{
    try {
        const result=await ShowLike()
        // console.log(result)
        res.json(result)
    } catch (error) {
        console.log(error)
        
    }
})
app.delete('/like/:Pid/:Iid',async(req,res)=>{
    try {
        const result =await DeleteLike(req.params.Pid,req.params.Iid);
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
app.listen(5000,()=>{
    console.log('server started')
})
const PersonalProfileModel = require("../model/personalprofile.model")
const RegistrationModel = require('../model/registration.model')
const EducationProfileModel = require('../model/educationprofile.model')
const StateModel = require('../model/state.model');
const CityModel = require('../model/city.model');
// const { where } = require("sequelize/types");
const InsertUserPersonalProfileData = async (userPersonalData) => {
    try {
        const result = await PersonalProfileModel.create(userPersonalData)
        return result
    } catch (error) {
        return error
        // console.log(error)
    }
}
const ShowProfileData = async () => {
    try {
        const result = await PersonalProfileModel.findAll();
        return result
    } catch (error) {
        return error
    }
}
const ShowUserPersonalProfileData = async (userEmail) => {
    const userProfileData = {
        "Profile_id": "", "User_name": "", "DateofBirth": "", "Gender": "","Profile_picture":"", "User_email": "", "User_mobileno": "", "User_alternativemobileno": "","State_id":"",
        "State_name": "", "City_id":"","City_name": "", "Address": "", "Education_id": "", "Class10_schoolname": "", "Class12_schoolname": "",
        "Class10_percentage": "", "Class12_percentage": "", "Degree": "",
        "Specialization": ""
    }
    try {
        const result1 = await RegistrationModel.findAll({ include: [{ model: PersonalProfileModel, required: false, where: { User_email: userEmail } }], where: { User_email: userEmail } });
        const [a] = result1
        const { User_name, User_email, User_mobileno } = a
        userProfileData["User_name"] = User_name
        userProfileData["User_email"] = User_email
        userProfileData["User_mobileno"] = User_mobileno
        if (a.PersonalProfile !== null) {
            const { Profile_id, DateofBirth, User_alternativemobileno, Gender, Address,Profile_picture } = a["PersonalProfile"]
            userProfileData["Profile_id"] = Profile_id
            userProfileData["DateofBirth"] = DateofBirth
            userProfileData["User_alternativemobileno"] = User_alternativemobileno
            userProfileData["Gender"] = Gender
            userProfileData["Address"] = Address
            userProfileData["Profile_picture"]=Profile_picture
        }
        const result2 = await PersonalProfileModel.findAll({ include: [{ model: EducationProfileModel, required: true,}], where: { User_email: userEmail } });
        const [b] = result2
        if (b !==undefined ) {
            if(b["EducationProfile"]!==null)
            {
                const { Class10_schoolname, Class12_schoolname, Class10_percentage, Class12_percentage, Degree, Specialization ,Education_id} = b["EducationProfile"]
                userProfileData["Class10_schoolname"] = Class10_schoolname
                userProfileData["Class12_schoolname"] = Class12_schoolname
                userProfileData["Class10_percentage"] = Class10_percentage
                userProfileData["Class12_percentage"] = Class12_percentage
                userProfileData["Degree"] = Degree
                userProfileData["Specialization"] = Specialization
                userProfileData["Education_id"] =Education_id
            }
        }
        const result3=await CityModel.findAll({include:[{model:PersonalProfileModel,required:true ,where:{User_email:userEmail}}]});
        if (result3.length!==0)
        {
            const result4=await StateModel.findAll({include:[{model:CityModel,attributes:['City_id','City_name','City_pincode'],required:true,where:{City_id:result3[0]["City_id"]}}]});
            const [c]=result4
            const {State_id, State_name} = c
            userProfileData["State_id"]=State_id
            userProfileData["State_name"]=State_name
            const[Cities]=c["Cities"]
            const {City_id,City_name,City_pincode}=Cities
            userProfileData["City_id"]=City_id
            userProfileData["City_name"]=City_name
            userProfileData["City_pincode"]=City_pincode
        }
        return userProfileData
        
    } catch (error) {
        console.log(error)
        return error
    }
}

const DeleteUserPersonalProfileData = async (profileId) => {
    try {
        const result = await PersonalProfileModel.destory({ where: { Profile_id: profileId } })
    } catch (error) {
        return error
    }
}
const UpdateUserPersonalProfileData = async (userPersonalProfileData, profileId) => {
    try {
        const result = await PersonalProfileModel.update(userPersonalProfileData, { where: { Profile_id: profileId } });
        return result

    } catch (error) {
        return error
    }
}
module.exports = { InsertUserPersonalProfileData, ShowProfileData, ShowUserPersonalProfileData, DeleteUserPersonalProfileData, UpdateUserPersonalProfileData };
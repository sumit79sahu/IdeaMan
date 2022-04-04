const StateModel = require('../model/state.model');
const SubcategoryModel = require("../model/subcategory.model");
const CategoryModel = require('../model/category.model');
const CityModel = require("../model/city.model")
const RegistrationModel=require("../model/registration.model")
const GetDetails = async () => {
    try {
        const details={"State":"","City":"","Category":"","Subcategory":"","Users":""}
        details["State"]=await StateModel.count();
        details["City"]=await CityModel.count();
        details["Category"]=await CategoryModel.count();
        details["Subcategory"]=await SubcategoryModel.count()
        details["Users"]=await RegistrationModel.count()
        return details;
    } catch (error) {
        return error
    }
}
module.exports={GetDetails}
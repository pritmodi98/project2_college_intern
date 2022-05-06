const collegeModel = require("../models/collegeModel");
const internModel = require("../models/InternModel");
const validator = require("../utils/validator");
const collegeReg=async function (req,res) {
    try {
        const data=req.body
        const {name,fullName,logoLink}=data                         //college data 
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({status:false,msg:'college data must be required to register college'})
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({status:false,msg:'name is required'})  
        }
        if (!validator.isValid(fullName)) {
            return res.status(400).send({status:false,msg:'fullName is required'})
        }
        if (!validator.isValid(logoLink)) {
            return res.status(400).send({status:false,msg:'logolink is required'})
        }
        let validLogoLink = await collegeModel.findOne({ logoLink });
        if (validLogoLink) {
            return res.status(400).send({ status: false, message: "Please provide valid URL." })
        }
        const checkName=await collegeModel.findOne({name:name})
        if (checkName) {
            return res.status(400).send({status:false,msg:`${name} is already registered` })
        }
        const checkFullName=await collegeModel.findOne({fullName:fullName})
        if (checkFullName) {
            return res.status(400).send({status:false,msg:`${fullName} is already registered`})
        }
        const createdData=await collegeModel.create(data)
        res.status(201).send({status:true,msg:'college has been registered successfully',data:createdData})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
   
}

const internReg=async function (req,res) {
    try {
        const data=req.body              //intern data
        const findData=await internModel.find(data)
        const {name,mobile,email,collegeName}=data                  
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({status:false,msg:'intern data must be required to apply for internship'})
        }
        
        if (!validator.isValid(name)) {
            return res.status(400).send({status:false,msg:'student name is required'})
        }
        if (!validator.isValid(mobile)) {
            return res.status(400).send({status:false,msg:'mobile no. is required'})
        }
       
        if (!validator.isValid(email)) {
            return res.status(400).send({status:false,msg:'email id is required'})   
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({status:false,msg:'this emailId is not a valid'})
        }
       
        if (!validator.isValid(collegeName)) {
            return res.status(400).send({status:false,msg:'collegeName is required'}) 
        }
        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).send({status:false,msg:'please provide 10 digit mobile number'}) 
            
        }
        const checkMobile=await internModel.findOne({mobile:mobile})
        if (checkMobile) {
            return res.status(400).send({status:false,msg:'Your mobile no. is already registered'})
        }
        const checkEmail=await internModel.findOne({email:email})
        if (checkEmail) {
            return res.status(400).send({status:false,msg:'this emailId is already registered'})
        }
        const checkCollege=await collegeModel.findOne({name:collegeName})
        if(!checkCollege) return res.status(404).send({status:false,msg:'college not found'})
        delete(data['collegeName'])
        data['collegeId']=checkCollege._id
        // const dataobj={name:name,mobile:mobile,email:email,collegeId:checkcollege._id}
        const createdData=await internModel.create(data)
        return res.status(201).send({status:true,msg:'intern has been registered successfully',data:createdData})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
   
}

const collegeDetails=async function (req,res) {
    try {
        const filteredData={}
        const collegeName=req.query.collegeName
        if (!validator.isValid(collegeName)) {
            return res.status(400).send({status:false,msg:'kindly input the query parameter'})
        }
        const collegeData=await collegeModel.findOne({name:collegeName})
        if (!collegeData) {
            return res.status(404).send({status:false,msg:'college has not been registered yet'})
        }
        // for (const key in collegeData) {
        //     if (['name','fullName','logoLink'].indexOf(key)!==-1) {
        //         filteredData[key]=collegeData.key
        //     }
        // }
        filteredData['name']=collegeData.name
        filteredData['fullName']=collegeData.fullName
        filteredData['logoLink']=collegeData.logoLink


        const internData=await internModel.find({collegeId:collegeData._id}).select({_id:1,name:1,email:1,mobile:1})
        if (internData.length===0) {
            return res.status(404).send({status:false,msg:`no students have applied for internship from ${collegeName} college`})
        }
        filteredData['interests']=internData
        return res.status(200).send({data:filteredData})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
   
}

module.exports={collegeReg,internReg,collegeDetails}
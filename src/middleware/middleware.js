// const jwt = require("jsonwebtoken");
// const validator = require("../utils/validator");

// const authentication = async function (req, res, next) {
//   try {
//     const token = req.headers["x-api-key"];
//     if (!token) {
//       return res.status(403).send({
//         status: false,
//         message: `Missing authentication token in request`
//       });
//     }

//     const decodedToken = jwt.verify(token, "uranium");
//     if (!decodedToken) {
//       return res.status(403).send({
//         status: false,
//         message: `Invalid authentication token in request`,
//       });
//     }

//     //req.authorId = verify.authorId;
//     next();

//   } catch (error) {
//     res.status(500).send({ status: false, Error: error.message });
//   }
// };


// const authorization=async function (req, res, next) {
//   try {
//     let authorId=req.body.authorId;

//     if(!authorId){
//       return res.status(400).send({status:false,msg:"author id required"})
//     }
//     const token = req.headers["x-api-key"];
//     const decodedToken = jwt.verify(token, "uranium");

//     //console.log(decodedToken)
//     if(decodedToken.authorId != authorId){
//       return res.status(401).send({status:false,msg:"unathorized access"})
//     }

//     req.authorId = decodedToken.authorId;
//     // console.log(req.authorId)
//     next();

//   } catch (error) {
//     res.status(500).send({ status: false, Error: error.message });
//   }
// };

// const authorizationforDeleteBlogById=async function (req, res, next) {
//   try {
//     const token = req.headers["x-api-key"];
//     const decodedToken = jwt.verify(token, "uranium");

//     req.authorId = decodedToken.authorId;
//     next();

//   } catch (error) {
//     res.status(500).send({ status: false, Error: error.message });
//   }
// };



// module.exports.authentication= authentication;
// module.exports.authorization=authorization;
// module.exports.deleteBlog=authorizationforDeleteBlogById;

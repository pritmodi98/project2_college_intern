const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController')
// const blogController = require('../controllers/blogController')
// const middleware = require('../middleware/middleware')


router.post('/functionup/colleges', collegeController.collegeReg);
router.post('/functionup/interns',collegeController.internReg)
router.get('/functionup/collegeDetails',collegeController.collegeDetails)

module.exports=router;


const express=require('express')
const router=express.Router()
const {registerUser, loginUser, getUsers}=require("../Controller/userController")
const {protect}=require('../middleware/auth')

router.post('/',loginUser)
router.post('/register',registerUser)
router.get('/getusers',getUsers)

module.exports=router
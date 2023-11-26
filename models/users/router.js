const express = require('express');
const router = express.Router();

const login = require('./services/login');
const signup = require('./services/Signup');
const UpdateUser = require('./services/UpdateUser');
const authenticate = require('../../middleware/authenticate');
const getUsers = require('./services/getUsers');


//  login
router.post('/login',async (req,res)=>{
    await login(req,res)
})

// get all users

router.get('/all/:userid',async (req,res)=>{
    await getUsers(req,res)
})

//  sign up user
router.post('/signup',async (req,res)=>{
    await signup(req,res)
})

//  update users data
router.put('/update', async (req,res)=>{
    await UpdateUser(req,res)
})

module.exports = router
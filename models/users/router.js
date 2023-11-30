const express = require('express');
const router = express.Router();

const login = require('./services/login');
const signup = require('./services/Signup');
const UpdateUser = require('./services/UpdateUser');
const authenticate = require('../../middleware/authenticate');
const getUsers = require('./services/getUsers');
const getUserById = require('./services/getUserById');
const followUser = require('./services/followUser');
const getUserData = require('./services/getUserData');
const unfollowUser = require('./services/unfollowUser');


//  login
router.post('/login',async (req,res)=>{
    await login(req,res)
})

// get all users

router.get('/all/:userid',async (req,res)=>{
    await getUsers(req,res)
})

// get single users

router.get('/:userid',async (req,res)=>{
    await getUserById(req,res)
})

//  sign up user
router.post('/signup',async (req,res)=>{
    await signup(req,res)
})

//  update users data
router.put('/update', async (req,res)=>{
    await UpdateUser(req,res)
})

//  follow a user
router.post('/follow', async (req,res)=>{
    await followUser(req,res)
})

// get follower
router.get('/getdata/:userId',async (req,res)=>{
    await  getUserData(req,res)
})

// unfollow user
router.post('/unfollow',async (req,res)=>{
    await unfollowUser(req,res)
})
module.exports = router
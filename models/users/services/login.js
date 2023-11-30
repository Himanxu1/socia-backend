const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req,res){
   
    try{
         const {email,password} = req.body

         if(!email || !password){
            return res.status(400).json({message:'All field required'})
         }

         const user = await prisma.user.findUnique({
            where:{
                email:email,
            },
            
         })

         if(!user){
            return res.status(401).json({ message: 'Authentication failed' });
         }
         const auth = await bcrypt.compare(password,user.password)
         if (!auth) {
           return res.json({message:'Incorrect password or email' }) 
         }
          
      // eslint-disable-next-line no-undef
        const token = jwt.sign(user.email, process.env.SECRET_KEY);

         res.status(201).json({ message: "User logged in successfully", success: true,token,user });

    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = login
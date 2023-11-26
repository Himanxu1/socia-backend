const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function signup(req,res){
    try{
       const {name,email,password} = req.body
       const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
       })
       if(existingUser){
        return res.status(400).json({ message: 'Email already exists' });
       }else{
          const hashedPassword = await bcrypt.hash(password,12);
           const user = await prisma.user.create({data: {
            name,
            email,
            password:hashedPassword
           }})
           return  res.json("signup success")
       }

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = signup
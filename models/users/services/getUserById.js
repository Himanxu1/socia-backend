
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getUserById(req,res){
    try{
    
       const {userid} = req.params
       

       const singleUser = await prisma.user.findUnique({
          where:{
            id:Number(userid)
          },
          select:{
            name:true,
            email:true,
            id:true,
            profile_url:true,
            bio:true
          }

       });
        return res.json(singleUser);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getUserById

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getUsers(req,res){
    try{
    
       const {userid} = req.params
       

       const allUsers = await prisma.user.findMany({
    
            select:{
                name:true,
                profile_url:true,
                id:true

            }
       
       });

       const tempUsers = allUsers.filter((item) =>{
        return item.id != userid
       })
  

       
        return res.json(tempUsers);
      

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getUsers
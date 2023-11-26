const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getBookmarks(req,res){

    try{
     const {userid}  = req.params
     const post = await prisma.bookmark.findMany({
        where:{
            user_id:Number(userid)
        },
        include:{
           post:true,
           user:true
        
        }
     })

     return  res.status(201).send({post:post})

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getBookmarks
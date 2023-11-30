const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getPost(req,res){

    try{
        
     const post = await prisma.post.findMany({
        include:{
            author:{
                select:{
                    id:true,
                    name:true,
                    profile_url:true
                }
            },
            likes:true
        }
     })

     return  res.status(201).send({post:post})

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getPost
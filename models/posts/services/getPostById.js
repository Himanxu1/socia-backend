const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getPostById(req,res){

    try{
        const {userId} = req.params
        if(!userId){
            return res.status(400).json("UserId required")
        }
     const post = await prisma.post.findMany({
        where:{
            authorId:Number(userId)
        },
        include:{
            author:{
                select:{
                    name:true,
                    id:true
                }
            },
        }
     })

     return  res.status(201).send({post:post})

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = getPostById
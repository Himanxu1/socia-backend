const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function likePost(req,res){

    try{
        const {userId,postId} = req.body
     const like = await prisma.like.create({
        data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          }
     })

     return  res.status(201).send(like)

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = likePost
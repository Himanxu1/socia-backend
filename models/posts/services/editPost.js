const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function editPost(req,res){

    try{
     const {postId,title} = req.body;

     if(!postId  ){
        return res.status(400).json({message:'All field required'})
     }
     
     const post = await prisma.post.update({
        where:{
            id:postId
        }
     })

     return  res.status(201).json("post delete success")

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = editPost
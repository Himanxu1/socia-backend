const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createPost(req,res){

    try{
     const {authorId,title,img} = req.body;

     if(!authorId || !title  ){
        return res.status(400).json({message:'All field required'})
     }
     
     const post = await prisma.post.create({data:{
        authorId,
        title,
        img
     }})

     return  res.status(201).json("post success")

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = createPost
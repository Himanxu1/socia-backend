
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function UpdateUser(req,res){
    try{
    
       const {name,bio,avatar,userid} = req.body

       const existingUser = await prisma.user.findUnique({
        where: {
          id: userid,
        },
      });
  
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
       
       const updatedUser = await prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          name: name || existingUser.name, // Use the new name if provided, otherwise keep the existing name
          bio: bio || existingUser.bio,    // Use the new bio if provided, otherwise keep the existing bio
          profile_url: avatar || existingUser.profile_url, // Use the new avatar if provided, otherwise keep the existing avatar
        },
      });
  
      res.json(updatedUser);


      

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = UpdateUser
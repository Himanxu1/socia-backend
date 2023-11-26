const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    // eslint-disable-next-line no-undef
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken)
    const rootUser = await prisma.user.findFirst({ 
        where:{
            email:verifyToken.email
        }
    });
    if (!rootUser) {
      throw new Error('User not Found');
    }
    req.token = token;
    req.rootUser = rootUser;
    next();
  } catch (err) {
    res.status(400).send('Unauthorized: No token provided');
    console.log(err);
  }
};

module.exports = authenticate;
require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
const userRoutes = require('./models/users/router')
const likeRoutes = require('./models/like/router')
const bookmarkRoutes = require('./models/bookmark/router')
const postRoutes = require('./models/posts/router')
const commentRoutes = require('./models/comment/router')
const feedRoutes = require('./models/feed/router')


app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/like',likeRoutes)
app.use('/api/bookmark',bookmarkRoutes)
app.use('/api/comment',commentRoutes)
app.use('/api/feed',feedRoutes)

const port = process.env.PORT || "3000";

app.get('/api',(req,res)=>{
    res.send("api working!")
})

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});

// app.post('/user', async (req, res) => {
//     const job = await prisma.user.create({ data: req.body });
//     res.json(job);
//   });

//   app.post('/post', async (req, res) => {
//     const job = await prisma.post.create({ data: req.body });
//     res.json(job);
//   });

//   app.get('/', async (req, res) => {
//     const job = await prisma.post.findMany();
//     res.json(job);
//   });
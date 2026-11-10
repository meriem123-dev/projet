const express = require('express');
const app= express();
const port = 3000;
const prisma = require('./src/prisma');

const postRoutes= require("./src/routes/posts.routes");
const authRoutes = require("./src/routes/auth.routes");

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//principal route
app.get('/',(req,res)=>{
    res.send("Congratulations!!")
})

//health
app.get('/health',async(req,res)=>
{
    try {
        await prisma.$queryRaw('SELECT 1');
        res.json({status : 'ok'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({status:'error',message:'database unreachable'})
        
    }
})

//routes
app.use('/posts',postRoutes);
app.use("/auth",authRoutes);




//erreurs
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

//launch
app.listen(port,()=>{
    console.log(`le serveur écoute sur le port : ${port}`)
})


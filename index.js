const express = require("express")
const {  connectMongoDb } = require("./connection")
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/static-Router")
const path=require("path")
const URL = require("./model/user")
const app = express()
const PORT= 8001


connectMongoDb("mongodb://127.0.0.1:27017/URL-SHORTNER").then(()=>{
    console.log("Mongo Db Connected")
})


app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.set("view engine","ejs")
app.set("views",path.resolve('./views'))


app.get('/test',  async (req,res)=>{
    return res.render("home")
})




app.use("/url", urlRouter)// backned
app.use("/",staticRouter)// frontned

// app.get('/url/:shortId', async (req,res)=>{
//     const shortId = req.params.shortId
//     const entry = await URL.findOneAndUpdate({shortId},
//         {
//             $push:{
//                 visitHistory:{timestamp:Date.now()}
//             }
        
//     })
//     res.redirect(entry.redirectURL)
// });


app.listen(PORT, ()=>
console.log(`Server started at Port:${PORT}`
))
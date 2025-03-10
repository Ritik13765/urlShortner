const shortid = require("shortid")
const URL = require("../model/user")

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    console.log(body, 'errrrrrr')
    if(!body.url) return res.status(404).json({error: "url not found"})
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })
     return res.render("home",{
        id : shortID
     })


}
// async function handleGetredirectURL(req,res){
// const shortId = req.params.shortId
//     const entry = await URL.findOneAndUpdate({shortId},
//         {
//             $push:{
//                 visitHistory:{timestamp:Date.now()}
//             }
        
//     })
//     res.redirect(entry.redirectURL)
// };

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId
    const result =await URL.findOne({shortId})
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory
    })
}

async function handleVisitHistoryAndUpdate(req,res){
    const shortId=req.params.shortId
    const entry = await URL.findOneAndUpdate({shortId},
{
     $push:{
    visitHistory:{timestamp:Date.now()}
    }
                    
  })
     res.redirect(entry.redirectURL)
        
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleVisitHistoryAndUpdate
}
const express = require("express")
const { handleGenerateNewShortUrl,handleGetAnalytics,handleVisitHistoryAndUpdate} = require("../controller/url")

const router = express.Router()

router.post("/",  handleGenerateNewShortUrl)
router.get("/:shortId", handleVisitHistoryAndUpdate)


// router.get
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;
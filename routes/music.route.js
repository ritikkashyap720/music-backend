const express = require("express")
const router = express.Router();
const { getSearch, getSongDetails, getSuggestionBySong } = require("../controller/music.controller");


router.get("/:search", getSearch)
router.get("/play/:videoId", getSongDetails)
router.get("/suggestions/:songs", getSuggestionBySong)

module.exports = router
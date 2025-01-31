const express = require("express")
const router = express.Router();
const { getSearch, getSongDetails, getSuggestionBySong,getAlbums, getSongsFromAlbum } = require("../controller/music.controller");


router.get("/:search", getSearch)
router.get("/albums/:search", getAlbums)
router.get("/play/:videoId", getSongDetails)
router.get("/suggestions/:songId", getSuggestionBySong)
router.get("/music_from_album/:albumId", getSongsFromAlbum)

module.exports = router
const express = require("express")
const router = express.Router();
const { getSearch,getSongInfo, getAudioStream, getSuggestionBySong,getAlbums, getSongsFromAlbum } = require("../controller/music.controller");


router.get("/:search", getSearch)
router.get("/albums/:search", getAlbums)
router.get("/play/:videoId", getAudioStream)
router.get("/suggestions/:songId", getSuggestionBySong)
router.get("/music_from_album/:albumId", getSongsFromAlbum)
router.get("/getSongDetails/:youtubeId",getSongInfo)

module.exports = router
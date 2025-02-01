const {
    getMusicBasedSuggestions,
    searchForMusic,
    searchForAlbums,
    searchForArtists,
    listMusicFromAlbum,
    getMusic
} = require("youtube-music-apis");

const ytdl = require("@distube/ytdl-core");

async function getSearch(req, res) {
    const { search } = req.params;
    const music = (await searchForMusic(search));
    res.json(music)
}

async function getAudioStream(req, res) {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).send('videoId is required');
    }
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid videoId');
    }
    try {
        // const videoInfo = await ytdl.getInfo(videoUrl);
        // const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
        // res.json({ "audio": audioFormats })
        res.setHeader("Content-Type", "audio/mpeg");
        ytdl(videoUrl, { filter: "audioonly", quality: "lowestaudio" }).pipe(res);
    } catch (error) {
        res.status(500).json({ 'Error streaming audio': error });
    }

}

async function getSuggestionBySong(req, res) {
    const { songId } = req.params;
    console.log(songId)
    const suggestions = await getMusicBasedSuggestions(songId)
    res.json(suggestions)

}
async function getAlbums(req, res) {
    const { search } = req.params;
    console.log(search)
    const albums = await searchForAlbums(search)
    res.json(albums)

}

async function getSongsFromAlbum(req, res) {
    const { albumId } = req.params;
    const songs = await listMusicFromAlbum(albumId)
    res.json(songs)

}

// get details of song

async function getSongInfo(req, res) {
    const { youtubeId } = req.params;
    const songDetails = await getMusic(youtubeId)
    res.json(songDetails)
}

module.exports = { getSearch, getSongInfo, getAudioStream, getSuggestionBySong, getAlbums, searchForArtists, getSongsFromAlbum }

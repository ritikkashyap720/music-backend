const YoutubeMusicApi = require('youtube-music-api');
const ytdl = require('ytdl-core');
const api = new YoutubeMusicApi()

function getSearch(req, res) {
    const { search } = req.params;

    api.initalize() // Retrieves Innertube Config
        .then(() => {
            api.search(search, "song").then(result => res.json(result.content)) // just search for songs
        })
}

async function getSongDetails(req, res) {
    {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).send('videoId is required');
        }

        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).send('Invalid videoId');
        }

        try {
            res.setHeader('Content-Type', 'audio/mpeg');
            try {
                const videoInfo = await ytdl.getInfo(videoUrl);
                const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");
                res.json({ "audio": audioFormats })
            } catch (error) {
                res.status(500).send('Error streaming audio');
            }
        } catch (error) {
            res.status(500).send('Error streaming audio');
        }
    }
}

function getSuggestionBySong(req, res) {
    const { songs } = req.params;
    api.initalize() // Retrieves Innertube Config
        .then(info => { api.search(songs, "song").then(result => res.json(result.content)) })
}

module.exports = { getSearch, getSongDetails, getSuggestionBySong }
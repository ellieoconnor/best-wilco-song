const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

let wilcoSongs = [
    {
        "id": 1,
        "songName": 'what light',
        "albumName": 'sky blue sky',
    },
    {
        "id": 2,
        "songName": 'heavy metal drummer',
        "albumName": "yankee hotel foxtrot"
    },
    {
        "id": 3,
        "songName": 'box full of letters',
        "albumName": 'a.m.'
    },
    {
        "id": 4,
        "songName": 'impossible germany',
        "albumName": 'sky blue sky'
    },
    {
        "id": 5,
        "songName": 'misunderstood',
        "albumName": 'being there'
    }
];

app.use(cors());

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
    return response.json(wilcoSongs);
});

// GET one song
app.get('/songs/:songName', (request, response) => {
    const songName = request.params.songName.toLowerCase();
    const song = wilcoSongs.find(s => s.songName === songName);

    if (!song) {
        return response.status(404).json({ error: "Song not found" });
    }

    return response.json(song);
});

app.get('/songs', (request, response) => {
    //console.log(songs);
    return response.json(wilcoSongs);
});

/* CREATE **/
app.post('/songs/:newSong', (request, response) => {

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`);
})
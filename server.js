const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

let songs = [
    {
        "id": 1,
        "songName": 'What Light',
        "albumName": 'Sky Blue Sky',
    },
    {
        "id": 2,
        "songName": 'Heavy Metal Drummer',
        "albumName": "Yankee Hotel Foxtrot"
    },
    {
        "id": 3,
        "songName": 'Box Full of Letters',
        "albumName": 'A.M.'
    },
    {
        "id": 4,
        "songName": 'Impossible Germany',
        "albumName": 'Sky Blue Sky'
    },
    {
        "id": 5,
        "songName": 'Misunderstood',
        "albumName": 'Being There'
    }
];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

// GET one song
app.get('/songs/:songName', (request, response) => {
    const songName = request.params.songName;
    const song = songs.find(s => s.songName === songName);

    if (!song) {
        return response.status(404).json({ error: "Song not found" });
    }

    return response.json(song);
});

app.get('/songs', (request, response) => {
    //console.log(songs);
    return response.json(songs);
});

/* CREATE **/
app.post('/songs/:newSong', (request, response) => {

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`);
})
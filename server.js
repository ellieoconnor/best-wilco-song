const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

const MongoClient = require('mongodb').MongoClient;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'best-wilco-songs'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName);
    })

app.set('view engine', 'ejs'); // telling us we are using ejs to generate our html
app.use(express.static('public'));  // any file in the public folder will be served up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    db.collection('wilcoSongs').find().sort({ likes: -1 }).toArray() // an array holding my database for this collection (an array of objects)
        .then(data => {
            //console.log(data);
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error));
});

// GET one song
//app.get('/songs/:songName', (request, response) => {
//    const songName = request.params.songName.toLowerCase();
//    const song = wilcoSongs.find(s => s.songName === songName);

//    if (!song) {
//        return response.status(404).json({ error: "Song not found" });
//    }

//    return response.json(song);
//});

//app.get('/songs', (request, response) => {
//    //console.log(songs);
//    return response.json(wilcoSongs);
//});

/* CREATE **/
app.post('/addSong', (request, response) => {
    db.collection('wilcoSongs').insertOne({ songName: request.body.songName, albumName: request.body.albumName, likes: 0 })
        .then(result => {
            console.log('Song Added');
            response.redirect('/'); // "refresh" page and gets the data
        })
        .catch(error => console.error(error));
});

/* UPDATE **/
app.put('/addOneLike', (request, response) => {
    db.collection('wilcoSongs').updateOne({ songName: request.body.songNameS, albumName: request.body.albumNameS, likes: request.body.likesS },
        {
            $set: {
                likes: request.body.likesS + 1
            }
        },
        {
            sort: { _id: -1 },
            upsert: false
        }
    )
        .then(result => {
            console.log('Added One Like');
            response.json('Like Added');
        })
        .catch(error => console.error(error));
});

/* Delete **/
app.delete('/deleteSong', (request, response) => {
    db.collection('wilcoSongs').deleteOne({ songName: request.body.songNameS })
        .then(result => {
            console.log('Song Deleted');
            response.json('Song Deleted');
        })
        .catch(error => console.error(error));
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`);
})
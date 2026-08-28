const listOfSongs = document.getElementById("songs");

async function loadSongs() {
    try {
        const response = await fetch("/songs");
        if (!response.ok) {
            throw new Error(`Failed to load songs: ${response.status}`);
        }
        const wilcoSongs = await response.json();

        wilcoSongs.forEach(song => {
            const songItems = document.createElement("li");
            songItem.textContent = song.songName;
            listOfSongs.appendChild(songItem);
        });
    } catch (error){
        console.error("Could not load songs:", error);
    }
}

loadSongs();

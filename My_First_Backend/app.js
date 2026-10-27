const express = require('express')
const app = express()

const port = 8080

function getRandomValueWithinRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSong() {
    songs = ["Yellow",
        "You'd Be So Nice to Come Home To",
        "Your Love for Me",
        "You're Getting to Be a Habit With Me",
        "You're Sensational",
        "Something Wonderful Happens in Summer",
        "Memories of You",
        "At Long Last Love",
        "I Won't Dance",
        "Nice Work if You Can Get It",
        "Pennies from Heaven",
        "(How Little It Matters) How Little We Know",
        "Old Devil Moon",
        "You Brought a New Kind of Love to Me",
        "I've Got You Under My Skin",
        "The Lady Is a Tramp",
        "You Make Me Feel So Young",
        "Around the World",
        "Autumn Leaves",
        "Baby, Won't You Please Come Home?",
        "Blue Hawaii",
        "Brazil",
        "Chicago (That Toddlin' Town)",
        "The Christmas Song",
        "Crazy Love",
        "The First Noël",
        "Hark the Herald Angels Sing",
        "He's My Guy"];

    random_index = getRandomValueWithinRange(0, songs.length - 1);

    return (songs[random_index]);
}

app.get('/', (req, res) => {
    console.log("From the /");
    res.send(getRandomSong());
})
app.get('/birth_date', (req, res) => {
    console.log("From the /birth_date");
    res.send("December 12, 1915");
})

app.get('/birth_city', (req, res) => {
    console.log("From the /birth_city");
    res.send("Hoboken, New Jersey, US");
})

app.get('/wives', (req, res) => {
    console.log("From the /wives");
    res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx");
})

app.get('/picture', (req, res) => {
    console.log("From the /picture");
    res.send("https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg");
})

app.get('/public', (req, res) => {
    console.log("From the /public");
    res.send("Everybody can see this page");
})

app.get('/protected', (req, res) => {
    array = req.headers.authorization;

    if (!array || !array.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Not authorized.');
    }

    decoded = Buffer.from(array.slice(6), 'base64').toString();
    [username, password] = decoded.split(':');

    if (username == "admin" && password == "admin") {
        res.send("Welcome, authenticated client");
    }

    res.set("WWW-Authenticate", "Basic realm='401'");
    res.status(401).send('Not authorized.');
})

app.listen(port, () => {
    console.log("Server started " + port);
})
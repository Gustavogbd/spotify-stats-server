const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'8d0a83dea9464b8e8ef6452f0facc1ca',
        clientSecret:'8e021bad7ea842a1ac1d475bb333a15d',
        refreshToken
    })
    spotifyApi.refreshAccessToken().then((data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId:'8d0a83dea9464b8e8ef6452f0facc1ca',
        clientSecret:'8e021bad7ea842a1ac1d475bb333a15d'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        res.sendStatus(400)
    })
})

app.listen(3001)
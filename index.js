const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
var pusher = new Pusher({
    appId: '599108',
    key: '246a49cf5a78dc6be23b',
    secret: '2c4101e38023ee129d96',
    cluster: 'ap2',
    encrypted: true
});

// pusher.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});


// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
        user_id:
            Math.random()
                .toString(36)
                .slice(2) + Date.now()
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

//listen on the app
app.listen(5050, () => {
    return console.log('Server is up on 5050')
});
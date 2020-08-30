const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router.js');


const app = express();

// App setup

app.use(morgan('combined'));
app.use(cors());

// Bodyparser middleware
app.use(
        bodyParser.urlencoded({
                extended:true
        })
);
app.use(bodyParser.json());

// routes
router(app);

// DB config

const db = require('./config/keys.js').mongoURI;

// Connect to mongoDB

mongoose.connect(
        db, {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
        return (
                console.log("MongoDB successfully connected")
        )
}).catch(err => {
        return (
                console.log(err)
        )
})



const PORT = 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
        console.log(`Server up and running on port:${PORT}`);
})
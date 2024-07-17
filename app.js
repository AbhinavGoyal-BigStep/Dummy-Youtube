const express = require('express')
const app = express();
const youtubeRouter = require('./routes/youtubeRoutes');
app.use(express.json());

app.use('/api/youtube', youtubeRouter);

module.exports = app;


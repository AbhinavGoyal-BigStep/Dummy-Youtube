const express = require("express");
const router = express.Router();
const youtubeSearch = require("../controllers/youtubeController")

router.route('/search').post(youtubeSearch)
module.exports = router;
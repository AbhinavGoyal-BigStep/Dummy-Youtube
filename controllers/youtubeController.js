const youtubeService = require("../services/youtubeService");
async function youtubeSearch(req, res) {
  try {
    const response = await youtubeService.search(req);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ status: "fail", error });
  }
}

module.exports = youtubeSearch;

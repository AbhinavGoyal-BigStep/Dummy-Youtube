const axiosService = require("./axoisService");

const search = async (req) => {
  try {
    const { part, maxResults, type, q, pageToken } = req.body;
    if (maxResults > 50) {
      const failResponse = createFailureResponse("max result should not be greater than 50");
      return failResponse;
    }
    const searchString = q.join("|");
    let searchUrl = `${process.env.SEARCH_URL}?key=${process.env.API_KEY}&part=${part}&maxResults=${maxResults}&q=${searchString}&type=${type}`;
    if (pageToken) {
      searchUrl = searchUrl + `&pageToken=${pageToken}`;
    }
    const result = await axiosService.get(searchUrl);
    const responseData = createSuccessResponseObject(result);
    return responseData;
  } catch (error) {
    const failResponse = createFailureResponse(error.message);
    return failResponse;
  }
};

const createSuccessResponseObject = (data) => {
  return {
    status: "success",
    length: data.items.length,
    result: {
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
      items: data.items.map((item) => {
        return {
          title: item.snippet.title,
          description: item.snippet.description,
          channelName: item.snippet.channelTitle,
          publishDate: item.snippet.publishedAt,
          thumbnails: {
            default: item.snippet.thumbnails.default.url,
            medium: item.snippet.thumbnails.medium.url,
            high: item.snippet.thumbnails.high.url,
          },
        };
      }),
    },
  };
};

const createFailureResponse = (error)=>{
  return {
    status: "Failure",
    error 
  }
}
module.exports = { search };

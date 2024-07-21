const NewsAPI = require("newsapi");
const logger = require("../../logger");

async function newsRoute(req, res) {
  logger.debug("Hits news API");
  const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

  const response = await newsapi.v2.topHeadlines({
    q: "trump",
    category: "politics",
    language: "en",
    country: "us",
  });
  res.status(200).json({
    message: "success",
    newsData: response,
  });
}
module.exports = {
  newsRoute,
};

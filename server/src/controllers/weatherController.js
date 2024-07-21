const { OpenWeatherAPI } = require("openweather-api-node");
const logger = require("../../logger");

async function weatherRoute(req, res) {
  let weather = new OpenWeatherAPI({
    key: process.env.open_weather_api_key,
  });

  const { units, coordinates } = req.body;

  if (!coordinates || !units) {
    logger.error("Coordinates and units are not passed along with request.");
    return res.status(400).json({
      message: "Failure",
      error: "Coordinates and units are required.",
    });
  }
  weather.setUnits(units);
  weather.setLocationByCoordinates(coordinates.lat, coordinates.lon);

  const [locationData, weatherData] = await Promise.all([
    weather.getLocation(),
    weather.getCurrent(),
  ]);

  res.status(200).json({
    message: "success",
    weatherData: {
      name: locationData.name,
      countryName: locationData.country,
      icon: weatherData.weather.icon.url,
      description: weatherData.weather.description,
      temperature: weatherData.weather.temp.cur,
    },
  });
}
module.exports = {
  weatherRoute,
};

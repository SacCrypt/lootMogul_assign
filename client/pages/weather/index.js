import axios from "axios";
import React from "react";
import nookies from "nookies";

function Index({ weatherData }) {
  const { name, countryName, icon, description, temperature } =
    weatherData.weatherData;
  return (
    <div>
      <ul>
        <li>Name: {name}</li>
        <li>Country: {countryName}</li>

        <li>
          <img src={icon} alt="weather icon"></img>
        </li>
        <li>Description: {description}</li>
        <li>Temperature: {temperature}</li>
      </ul>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  console.log(cookies);
  const token = cookies.token;
  const weatherResponse = await axios.post(
    "http://localhost:5000/api/weather",
    {
      coordinates: { lat: 19.076, lon: 72.8777 },
      units: "imperial",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const weatherData = weatherResponse.data;

  return {
    props: {
      weatherData,
    },
  };
}

export default Index;

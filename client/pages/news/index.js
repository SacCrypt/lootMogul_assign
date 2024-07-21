import axios from "axios";
import React from "react";
import nookies from "nookies";

function Index({ newsData }) {
  const { name, countryName, icon, description, temperature } =
    newsData.newsData;
  console.log(newsData);
  return (
    <div>
      {newsData.newsData.articles.map((article) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              <h3>{article.author} </h3>
              <p> {article.title}</p>
              <img src={article.urlToImage} height={150} width={150}></img>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = cookies.token;
  const newsResponse = await axios.get("http://localhost:5000/api/news", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const newsData = newsResponse.data;

  return {
    props: {
      newsData,
    },
  };
}

export default Index;

require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const token = process.env.AUTH;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to CORS server 😁");
});

app.get("/movies", (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    headers: {
      accept: "application/json",
      Authorization:
        token,
    },
  };
  axios
    .request(options)
    .then((res) => {
      response.send(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/images", (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/configuration",
    headers: {
      accept: "application/json",
      Authorization:
        token
    },
  };
  axios
    .request(options)
    .then((res) => {
      response.send(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

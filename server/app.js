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

// Get movies that are currently in theatres
app.get("/movies", (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    headers: {
      accept: "application/json",
      Authorization: token,
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

// Get movies by ID

app.get("/movie/:id", (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${Number(request.params.id)}`,
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };
  axios
    .request(options)
    .then((res) => {
      response.send(res.data);
      // console.log(res.data);
    })
    .catch((error) => {
      response.status(400);
      response.send(err.config.data || "Couldn't fetch data!");
      console.error(error);
    });
});

// Get reviews

app.get("/reviews/:id", (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const options = {
    method: "GET",
    url: 'https://api.themoviedb.org/3/movie/502356/credits?language=en-US',    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };
  axios
    .request(options)
    .then((res) => {
      response.send(res.data);
      // console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// Get movies images
// app.get("/images", (request, response) => {
//   response.header({ "Access-Control-Allow-Origin": "*" });
//   const options = {
//     method: "GET",
//     url: "https://api.themoviedb.org/3/configuration",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         token
//     },
//   };
//   axios
//     .request(options)
//     .then((res) => {
//       response.send(res.data);
//       // console.log(res.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

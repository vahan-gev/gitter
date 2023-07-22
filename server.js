var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");
const CLIENT_ID = "aca02b2a6277ef27921d";
const CLIENT_SECRET = "5ffdae34b8b184b0687521077d475647e87becb9";

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  console.log(req.query.code);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  try {
    const response = await fetch("https://github.com/login/oauth/access_token" + params, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

app.get("/getUserData", async function (req, res) {
  const accessToken = req.headers.authorization;
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to get user data" });
  }
});

app.listen(4000, function () {
  console.log("CORS server running on port 4000");
});

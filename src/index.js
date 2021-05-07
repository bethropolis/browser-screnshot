const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("post request only");
});

app.post("/", (req, res) => {
  res.header("Content-Type", "application/json"); 

  if (req.body.url) {
    const url = encodeURI(req.body.url);
    axios
      .get("https://api.apiflash.com/v1/urltoimage", {
        params: {
          access_key: "6b7c9ea011414030a3000a17ad9d498d",
          url: url, 
          response_type: "json" 
        } 
      })
      .then(function (response) {
        res.json(response.data);       
      }) 
      .catch(function (error) { 
        console.log(error);
        res.json("an error occured");
      });
  } else {
    res.json("url not provided");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

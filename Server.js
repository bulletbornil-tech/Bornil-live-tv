const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/playlist.m3u", (req, res) => {
  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.sendFile(__dirname + "/playlist.m3u");
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});

const express = require("express");

const app = express();
const port = 4000;

// Endpoint that returns 200
app.get("/success", (req, res) => {
  res.status(200).send("Success!");
});

// Endpoint that crashes the application
app.get("/crash", (req, res, next) => {
  try {
    throw new Error("Application crashed!");
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app
  .listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server", err);
  });

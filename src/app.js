import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "eCommerce Admin Platform API is running",
  });
});

export default app;
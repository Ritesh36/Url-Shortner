import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDB from "./src/config/mongo.config.js"; 
import urlSchema from "./src/models/shortUrl.model.js";
import Short_Url from "./src/routes/shortUrl.routes.js";   

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", Short_Url);

app.get("/:id", async (req, res) => {
  const {id} = req.params;
  const url = await urlSchema.findOne({short_url: id});
  if (url) {
    res.redirect(url.full_url);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});

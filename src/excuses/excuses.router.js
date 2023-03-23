const express = require("express");
const { getAdminMessage } = require("./excuses.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

// This will help us connect to the database
const dbo = require("../db/conn");

const excusesRouter = express.Router();

excusesRouter.get("/", async (req, res) => {
  const db_connect = dbo.getDb();

  try {
    const excuses = await db_connect.collection("excuses").find({}).toArray();
    res.status(200).json(excuses);
  } catch (error) {
    console.log("An error occurred pulling the excuses. " + error);
  }
});

excusesRouter.get("/add", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);

  //   let db_connect = dbo.getDb();

//   let data = {
//     excuse: req.body.excuse,
//   };

//   try {
//     const excuse = await db_connect.collection("excuses").insertOne(data);
//     console.log(excuse.insertedId); // this will be the ID that we use to tie this to the USER
//     res.json(excuse);
//   } catch (error) {
//     console.log(error);
//   }
});

module.exports = { excusesRouter };

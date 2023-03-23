const express = require("express");
const { getAdminMessage, getProtectedMessage } = require("./excuses.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

// This will help us connect to the database
const dbo = require("../db/conn");

const excusesRouter = express.Router();

excusesRouter.get("/public", async (req, res) => {
  const db_connect = dbo.getDb();

  try {
    const excuses = await db_connect.collection("excuses").find({}).toArray();
    res.status(200).json(excuses);
  } catch (error) {
    console.log("An error occurred pulling the excuses. " + error);
  }
});

excusesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

excusesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});

module.exports = { excusesRouter };

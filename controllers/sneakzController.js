const express = require("express");
const sneakz = express.Router();

const { getAllSneakers } = require("../queries/sneakz");

sneakz.get("/", async (req, res) => {
  const allSneakers = await getAllSneakers();

  if (allSneakers[0]) {
    res.status(200).json(allSneakers);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = sneakz;

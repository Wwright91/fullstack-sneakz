const express = require("express");
const sneakz = express.Router();

const {
  getAllSneakers,
  getOneSneaker,
  createSneaker,
} = require("../queries/sneakz");

sneakz.get("/", async (req, res) => {
  const allSneakers = await getAllSneakers();

  if (allSneakers[0]) {
    res.status(200).json(allSneakers);
  } else {
    res.status(500).json({ error: "Server Error!" });
  }
});

sneakz.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sneaker = await getOneSneaker(id);
  if (sneaker) {
    res.json(sneaker);
  } else {
    res.status(404).json({ error: "No Sneaker Found!" });
  }
});

sneakz.post("/", async (req, res) => {
  try {
    const sneaker = await createSneaker(req.body);
    res.json(sneaker);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = sneakz;

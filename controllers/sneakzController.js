const express = require("express");
const sneakz = express.Router();

const {
  getAllSneakers,
  getOneSneaker,
  createSneaker,
  deleteSneaker,
  updateSneaker,
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

sneakz.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSneaker = await deleteSneaker(id);
  if (deletedSneaker.id) {
    res.status(200).json(deletedSneaker);
  } else {
    res.status(404).json({ error: `No Sneaker With ID: ${id} Found!` });
  }
});

sneakz.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedSneaker = await updateSneaker(id, req.body);
  res.status(200).json(updatedSneaker);
});

module.exports = sneakz;

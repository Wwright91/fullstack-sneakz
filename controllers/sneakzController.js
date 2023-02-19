const express = require("express");
const sneakz = express.Router();

const {
  getAllSneakers,
  getOneSneaker,
  createSneaker,
  deleteSneaker,
  updateSneaker,
} = require("../queries/sneakz");

const { addToCart, deleteCartItem } = require("../queries/cart");

const {
  checkName,
  checkSize,
  checkColor,
  checkBoolean,
} = require("../vallidations/checkSneaker");

const db = require("../db/dbConfig");

const reviewsController = require("./reviewsController.js");
sneakz.use("/:sneakerId/reviews", reviewsController);

sneakz.get("/", async (req, res) => {
  const allSneakers = await getAllSneakers();

  let sneakersCopy = [...allSneakers];

  const { color, brand } = req.query;

  if (color) {
    console.log(color);
    sneakersCopy = sneakersCopy.filter(
      ({ color }) => color.toLowerCase() === req.query.color.toLowerCase()
    );
  }

  if (brand) {
    sneakersCopy = sneakersCopy.filter(
      ({ brand }) => brand.toLowerCase() === req.query.brand.toLowerCase()
    );
  }

  if (sneakersCopy[0]) {
    res.status(200).json(sneakersCopy);
  } else {
    res.status(500).json({ error: "Server Error!" });
  }
});

sneakz.post("/cart", async (req, res) => {
  try {
    const item = await addToCart(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sneakz.get("/cart", async (req, res) => {
  try {
    const allItems = await db.any(
      "SELECT * FROM cart JOIN sneakers ON sneakers.id = cart.sneaker_id"
    );
    console.log("allItems", allItems);
    res.json(allItems);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sneakz.delete("/cart", async (req, res) => {
  try {
    const emptyCart = await db.any("TRUNCATE TABLE cart");
    res.json(emptyCart);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sneakz.delete("/cart/:sneaker_id", async (req, res) => {
  const { sneaker_id } = req.params;
  const deletedSneaker = await deleteCartItem(sneaker_id);
  if (deletedSneaker) {
    res.status(200).json(deletedSneaker.id);
  } else {
    res.status(404).json({ error: `No Sneaker With ID: ${sneaker_id} Found!` });
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

sneakz.post(
  "/",
  checkName,
  checkSize,
  checkColor,
  checkBoolean,
  async (req, res) => {
    if (!req.body.img) {
      req.body.img =
        "https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg";
    }
    if (!req.body.price) {
      req.body.price = 1;
    }

    try {
      const sneaker = await createSneaker(req.body);
      res.json(sneaker);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

sneakz.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSneaker = await deleteSneaker(id);
  if (deletedSneaker.id) {
    res.status(200).json(deletedSneaker);
  } else {
    res.status(404).json({ error: `No Sneaker With ID: ${id} Found!` });
  }
});

sneakz.put(
  "/:id",
  checkName,
  checkSize,
  checkColor,
  checkBoolean,
  async (req, res) => {
    const { id } = req.params;

    if (!req.body.img) {
      req.body.img =
        "https://www.shutterstock.com/image-vector/no-image-available-vector-hand-260nw-745639717.jpg";
    }

    if (!req.body.price) {
      req.body.price = 1;
    }

    const updatedSneaker = await updateSneaker(id, req.body);
    res.status(200).json(updatedSneaker);
  }
);

module.exports = sneakz;

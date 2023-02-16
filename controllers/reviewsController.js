const express = require("express");
const reviews = express.Router({ mergeParams: true });
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews");

reviews.get("/", async (req, res) => {
  const { sneakerId } = req.params;

  try {
    const allReviews = await getAllReviews(sneakerId);
    res.json(allReviews);
  } catch (err) {
    res.json(err);
  }
});

reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

reviews.post("/", async (req, res) => {
  try {
    const review = await createReview(req.body);
    res.json(review);
  } catch (error) {
    res.status(400).json({ error });
  }
});

reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json("Review not found");
  }
});

reviews.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReview = await updateReview(id, req.body);
  res.status(200).json(updatedReview);
});

module.exports = reviews;

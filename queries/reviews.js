const db = require("../db/dbConfig.js");

const getAllReviews = async (sneaker_id) => {
  try {
    const allReviews = await db.any(
      "SELECT * FROM reviews WHERE sneaker_id=$1",
      sneaker_id
    );
    return allReviews;
  } catch (error) {
    return error;
  }
};

const getReview = async (id) => {
  try {
    const oneReview = await db.oneOrNone(
      "SELECT * FROM reviews WHERE id=$1",
      id
    );
    return oneReview;
  } catch (error) {
    return error;
  }
};

const createReview = async (review) => {
  const { reviewer, content, sneaker_id } = review;

  try {
    const newReview = await db.oneOrNone(
      "INSERT INTO reviews (reviewer, content, sneaker_id) VALUES($1, $2, $3) RETURNING *",
      [reviewer, content, sneaker_id]
    );
    return newReview;
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      id
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

const updateReview = async (id, review) => {
  const { reviewer, content, sneaker_id } = review;

  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET reviewer=$1, content=$2, sneaker_id=$3 where id=$4 RETURNING *",
      [reviewer, content, sneaker_id, id]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};

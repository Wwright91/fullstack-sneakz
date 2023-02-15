const db = require("../db/dbConfig.js");

// const getCart = async () => {
//   try {
//     const cart = await db.any("SELECT * FROM cart");
//     return cart;
//   } catch (error) {
//     return error;
//   }
// };

const addToCart = async (cart) => {
  const { sneaker_id } = cart;

  try {
    const item = await db.oneOrNone(
      "INSERT INTO cart (sneaker_id) VALUES ($1) RETURNING *",
      sneaker_id
    );
    return item;
  } catch (error) {
    throw error;
  }
};

const deleteCartItem = async (sneaker_id) => {
  try {
    const deletedItem = await db.one(
      "DELETE FROM cart WHERE sneaker_id = $1 RETURNING *",
      sneaker_id
    );
    return deletedItem;
  } catch (error) {
    return error;
  }
};

// const emptyCart = async () => {
//   try {
//     // ("DELETE FROM cart");
//       ("TRUNCATE TABLE cart");
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  addToCart,
  deleteCartItem,
};

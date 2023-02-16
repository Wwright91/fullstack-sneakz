const db = require("../db/dbConfig.js");

const getAllSneakers = async () => {
  try {
    const allSneakers = await db.any("SELECT * FROM sneakers");
    return allSneakers;
  } catch (error) {
    return error;
  }
};

const getOneSneaker = async (id) => {
  try {
    const oneSneaker = await db.oneOrNone(
      "SELECT * FROM sneakers WHERE id=$1",
      id
    );
    return oneSneaker;
  } catch (error) {
    return error;
  }
};

const createSneaker = async (sneaker) => {
  const { price, seller_id, name, brand, color, used, img, review } = sneaker;

  try {
    const newSneaker = await db.oneOrNone(
      "INSERT INTO sneakers (price, seller_id, name, brand, color, used, img, review) VALUES($1, $2, INITCAP($3), INITCAP($4), INITCAP($5), $6, $7, $8) RETURNING *",
      [price, seller_id, name, brand, color, used, img, review]
    );
    return newSneaker;
  } catch (error) {
    throw error;
  }
};

const deleteSneaker = async (id) => {
  try {
    const deletedSneaker = await db.one(
      "DELETE FROM sneakers WHERE id = $1 RETURNING *",
      id
    );
    return deletedSneaker;
  } catch (error) {
    return error;
  }
};

const updateSneaker = async (id, sneaker) => {
  const { price, seller_id, name, brand, color, used, img, review } = sneaker;
  try {
    const updatedSneaker = await db.one(
      "UPDATE sneakers SET  price=$1, seller_id=$2, name=INITCAP($3), brand=INITCAP($4), color=INITCAP($5), used=$6, img=$7, review =$8 WHERE id=$9 RETURNING *",
      [price, seller_id, name, brand, color, used, img, review, id]
    );
    return updatedSneaker;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSneakers,
  getOneSneaker,
  createSneaker,
  deleteSneaker,
  updateSneaker,
};

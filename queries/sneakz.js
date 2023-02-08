const db = require("../db/dbConfig.js");

const getAllSneakers = async () => {
  try {
    const allSneakers = await db.any("SELECT * FROM sneakers");
    return allSneakers;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllSneakers };

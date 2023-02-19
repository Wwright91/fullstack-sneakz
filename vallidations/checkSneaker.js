const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "Sneaker name is required!" });
  }
};

const checkSize = (req, res, next) => {
  if (req.body.size) {
    next();
  } else {
    res.status(400).json({ error: "Sneaker size is required!" });
  }
};

const checkColor = (req, res, next) => {
  if (req.body.color) {
    next();
  } else {
    res.status(400).json({ error: "Sneaker color is required!" });
  }
};

const checkBoolean = (req, res, next) => {
  const { used } = req.body;
  if (
    used.toString() === "true" ||
    used.toString() === "false" ||
    used === undefined
  ) {
    next();
  } else {
    res.status(400).json({ error: "used must be a boolean value!" });
  }
};

module.exports = { checkName, checkSize, checkColor, checkBoolean };

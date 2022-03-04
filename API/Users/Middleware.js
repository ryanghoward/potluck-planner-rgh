const User = require("./modal");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../tokenBuilder");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 422, message: "invalid token" });
      } else {
        req.token = decoded;
        next();
      }
    });
  } else {
    next({ status: 404, message: "token is required" });
  }
};

const checkTokenId = (req, res, next) => {
  next();
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const exist = await User.getBy({ username });
    if (!exist) {
      next({
        message: "Invalid credentials",
        status: 401,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameUnique = async (req, res, next) => {
  try {
    const { username } = req.body;
    const exist = await User.getBy({ username });

    if (exist.length >= 1) {
      next({
        message: "Username taken",
        status: 422,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUserPayload = (req, res, next) => {
  next();
};

module.exports = {
  checkToken,
  checkTokenId,
  checkUsernameExists,
  checkUsernameUnique,
  checkUserPayload,
};

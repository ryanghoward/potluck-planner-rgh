const db = require("../data/db-config");

const getAll = () => db("users").select("username");

const getBy = (filter) => {
  return db("users").where(filter);
};

const getById = (user_id) => {
  return getBy({ user_id }).first();
};

const addUser = async (user) => {
  const [newUser] = await db("users").insert(user, ["username"]);
  return newUser;
};

module.exports = {
  getBy,
  addUser,
  getAll,
};

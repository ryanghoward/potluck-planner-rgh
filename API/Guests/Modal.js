const db = require("../data/db-config");

const addGuest = (potluck_id, username) => {
  return db("users")
    .where({ username }, ["user_id"])
    .first()
    .then(({ user_id }) =>
      db("guests").insert({
        potluck_id,
        user_id,
      })
    );
};

const getById = (guest_id) => {
  return db("guests").where({ guest_id }).first();
};

const guestGoing = (guest_id, guest) => {
  return db("guests").update(guest).where({ guest_id });
};

module.exports = {
  addGuest,
  guestGoing,
  getById,
};

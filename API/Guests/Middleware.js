const { getById } = require("./modal");

const guestExists = (req, res, next) => {
  getById(req.params.guest_id)
    .then((guest) => {
      if (guest) {
        next();
      } else {
        next({ status: 404, message: "guest does not exist" });
      }
    })
    .catch(next);
};
module.exports = {
  guestExists,
};

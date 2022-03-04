const router = require("express").Router();
const { guestGoing } = require("./modal");
const { guestExists } = require("./middleware");

router.put("/:guest_id", guestExists, (req, res, next) => {
  const { guest_id } = req.params;

  guestGoing(guest_id, req.body)
    .then((guest) => res.status(200).json(guest))
    .catch(next);
});

module.exports = router;

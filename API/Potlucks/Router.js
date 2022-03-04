const router = require("express").Router();
const { verifyPotluckPayload, checkPotluckExists } = require("./middleware");
const { getAll, addPotluck, remove, getPotluck } = require("./modal");
const { addGuest } = require("../guests/modal");
const { addFood } = require("../foods/modal");

router.get("/", (req, res, next) => {
  getAll()
    .then((potlucks) => res.status(200).json(potlucks))
    .catch(next);
});

router.get("/:potluck_id", (req, res, next) => {
  const { potluck_id } = req.params;
  getPotluck(potluck_id)
    .then((potluck) => res.status(200).json(potluck))
    .catch(next);
});

router.post("/", verifyPotluckPayload, (req, res, next) => {
  const { potluck, guests, foods } = req;

  addPotluck(potluck)
    .then(([newPotluck]) => {
      const { potluck_id } = newPotluck;
      foods?.forEach(async (f) => await addFood(potluck_id, f));
      guests?.forEach(async (g) => await addGuest(potluck_id, g));
      res.status(201).json(newPotluck);
    })
    .catch(next);
});

router.delete("/:potluck_id", checkPotluckExists, (req, res, next) => {
  const { potluck_id } = req.params;
  remove(potluck_id)
    .then(() => res.status(200).json(req.potluck))
    .catch(next);
});

module.exports = router;

const router = require("express").Router();
const { getAll } = require("./modal");

router.get("/", async (req, res, next) => {
  try {
    const allFoods = await getAll();
    res.status(200).json(allFoods);
  } catch (error) {
    next(error);
  }
});

router.get("/:foodName", (req, res, next) => {
  const { foodName } = req.params;
  getAll()
    .then((foods) => {
      const searchedFor = foods.filter((item) => item.food_name === foodName);

      console.log(searchedFor);
      res.status(200).json(searchedFor);
    })
    .catch(next);
});

module.exports = router;

const db = require("../data/db-config");

const getAll = () => db("foods");

const findBy = (filter) => {
  return db("foods").where(filter);
};

const checkFoodExists = (food_name) => {
  return findBy({ food_name }).first();
};

const addFood = (potluck_id, food) => {
  checkFoodExists(food)
    .then((exists) => {
      if (exists) {
        return exists.food_id;
      } else {
        return db("foods")
          .insert({ food_name: food }, ["food_id"])
          .then(([food]) => food.food_id);
      }
    })
    .then((food_id) => {
      return db("potluck_foods")
        .insert({ potluck_id, food_id }, ["potluck_food_id"])
        .then(([food]) => food.potluck_food_id);
    });
};

module.exports = {
  addFood,
  getAll,
};


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('guests').del()
    .then(function () {
      // Inserts seed entries
      return knex('guests').insert([
        {
          potluck_id: 1,
          potluck_food_id: 1,
          user_id: 1,
          accepted: false,
        },
        {
          potluck_id: 1,
          potluck_food_id: 2,
          user_id: 1,
          accepted: false,
        },
      ]);
    });
};

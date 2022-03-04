
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('potluck_foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('potluck_foods').insert([
        {
          potluck_id: 1,
          food_id: 1
        },
        {
          potluck_id: 1,
          food_id: 2
        },
      ]);
    });
};

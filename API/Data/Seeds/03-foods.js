
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {
          food_name: 'turkey'
        },
        {
          food_name: 'cramberry sauce'
        },
        {
          food_name: 'special rice'
        },
        {
          food_name: 'mashed potato'
        },
        {
          food_name: 'tacos'
        },
        {
          food_name: 'pizza'
        },
        {
          food_name: 'guacamole'
        },
      ]);
    });
};

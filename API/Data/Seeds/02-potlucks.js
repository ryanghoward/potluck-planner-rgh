
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('potlucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {
          potluck_name: 'Fourth of July',
          date: '7-4-2022',
          time: '12:00:00',
          user_id: 1,
          location: 'U.S.A'
        },
        {
          potluck_name: 'Thanksgiving',
          date: '11-24-2022',
          time: '16:00:00',
          user_id: 1,
          location: 'U.S.A'
        },
        {
          potluck_name: 'Christmas',
          date: '12-25-2022',
          time: '08:00:00',
          user_id: 1,
          location: 'U.S.A'
        }
      ]);
    });
};

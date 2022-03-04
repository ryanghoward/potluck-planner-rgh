exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          username: "ryan", password: "1234", email: "ryan@test.com"
        },
      ]);
    });
};

exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 200).unique()
      users.timestamps(false, true)
    })
    .createTable("potlucks", potluck => {
      potluck.increments("potluck_id");
      potluck.string("potluck_name").notNullable();
      potluck.date("date").notNullable();
      potluck.time("time").notNullable();
      potluck.string("location").notNullable();
      potluck.integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })

    .createTable("foods", food => {
      food.increments("food_id");
      food.string("food_name").notNullable();
    })
    .createTable("potluck_foods", pfood => {
      pfood.increments("potluck_food_id");
      pfood.integer("potluck_id")
        .notNullable()
        .unsigned()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      pfood.integer("food_id")
        .notNullable()
        .unsigned()
        .references("food_id")
        .inTable("foods")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable("guests", guest => {
      guest.increments("guest_id");
      guest.integer("potluck_id")
        .notNullable()
        .unsigned()
        .references("potluck_id")
        .inTable("potlucks")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      guest.integer("potluck_food_id")
        .unsigned()
        .references("potluck_food_id")
        .inTable("potluck_foods")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      guest.integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      guest.boolean("accepted")
        .defaultTo(false);
    });
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('guests')
    .dropTableIfExists('potluck_foods')
    .dropTableIfExists('foods')
    .dropTableIfExists('potlucks')
    .dropTableIfExists('users')
}

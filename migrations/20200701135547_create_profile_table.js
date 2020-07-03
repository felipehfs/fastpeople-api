
exports.up = function(knex) {
  return knex.schema.createTable('profiles', function(table) {
    table.increments('id').primary();
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id');
    table.string('avatar');
    table.boolean('online');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};

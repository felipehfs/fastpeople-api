
exports.up = function(knex) {
  return knex.schema.createTable('videos', function(table) {
     table.increments('id').primary();
     table.string('name').notNullable(); 
     table.string('url').notNullable(); 
     table.integer('views').unsigned(); 
     table.integer('owner').unsigned();
     table.foreign('owner').references('users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};

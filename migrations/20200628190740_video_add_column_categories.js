
exports.up = function(knex) {
  return knex.schema.alterTable('videos', function(table) {
      table.integer('categories_id').unsigned();
      table.foreign('categories_id').references('categories.id');
  })
};

exports.down = function(knex) {
    return knex.schema.alterTable('videos', function(table) {
        table.dropcolumn('categories_id');
    })
};

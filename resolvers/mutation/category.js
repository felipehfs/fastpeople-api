const knex = require("../../config/db");

module.exports = {
  async newCategory(_, args) {
    const [id] = await knex("categories").returning("id").insert({
      name: args.name,
    });

    const categoryWanted = await knex("categories").where({ id }).first();

    return categoryWanted;
  },
};

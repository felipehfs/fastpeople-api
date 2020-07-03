const knex = require("../../config/db");

module.exports = {
  async categories() {
    const categoriesSaved = await knex("categories").select("*");
    return categoriesSaved;
  },
};

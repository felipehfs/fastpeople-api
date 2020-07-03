const knex = require("../../config/db");

module.exports = {
  async users(_, args) {
    const users = await knex("users")
      .select("id", "name", "email");
    return users;
  },
};

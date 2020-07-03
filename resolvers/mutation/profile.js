const knex = require("../../config/db");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  async newProfile(_, { avatar, online }, { currentUser }) {
    if (!currentUser) throw new AuthenticationError("Not Authenticated");

    const profileExists = await knex("profiles")
      .where({ users_id: currentUser.id })
      .first();

    if (profileExists) {
      await knex("profiles")
        .where({ users_id: currentUser.id })
        .update({ avatar, online });
    } else {
      const [id] = await knex("profiles")
        .returning("id")
        .insert({ users_id: currentUser.id, avatar, online });
    }

    const users_id = profileExists ? profileExists.id : id;

    const newProfile = await knex("profiles")
      .select("*")
      .where({ id: users_id })
      .first();

    return newProfile;
  },
};

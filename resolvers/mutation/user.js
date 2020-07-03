const knex = require("../../config/db");
const { ValidationError } = require("apollo-server");
const jwt = require('jsonwebtoken');

module.exports = {
  async newUser(_, args) {
    const userWanted = await knex("users")
      .select("id", "name", "email", "password")
      .where({ email: args.email })
      .first();

    if (userWanted) throw ValidationError("Email já cadastrado!");

    const [id] = await knex("users")
      .returning("id").insert({
        name: args.name,
        email: args.email,
        password: args.password,
      });

    const user = await knex("users")
      .select("id", "name", "email", "password")
      .where({ id })
      .first();

    return user;
  },
  async login(_, args) {
    const userWanted = await knex("users")
      .select("*")
      .where("email", "=", args.email)
      .first();

    if (!userWanted) throw new ValidationError("Usuário não encontrado!");

    if (userWanted.password === args.password) {
      return jwt.sign({
        id: userWanted.id,
        email: userWanted.email
      }, 'secret', {
        expiresIn: "10days"
      });
    } else {
      throw new ValidationError("Usuário e senha não encontrado!");
    }
  },
};

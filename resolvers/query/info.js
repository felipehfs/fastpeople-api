const knex = require('../../config/db');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    async info(_, args, { currentUser }) {
        if (!currentUser) throw new AuthenticationError("Not authenticated");

        const profile = await knex('profiles')
            .select('id', 'avatar', 'online')
            .where({ users_id: currentUser.id })
            .first();

        return Object.assign({}, profile, currentUser);
    }
}
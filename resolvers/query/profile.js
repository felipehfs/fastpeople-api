const knex = require('../../config/db');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    async usersOnline(_, args) {
        const total = await knex('profiles')
            .where({ online: true})
            .count()
        
        return Number.parseInt(total[0].count);
    },
    async myProfile(_, args, { currentUser }) {
        if (!currentUser) throw new AuthenticationError("Not Authenticated");

        const profile = await knex('profiles')
            .where({ users_id: currentUser.id })
            .first();

        return profile;
    }
}
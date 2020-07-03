const knex = require('../../config/db');


module.exports = {
    profile(args) {
        return knex('profiles')
            .where({ users_id: args.id })
            .first();
    }
}
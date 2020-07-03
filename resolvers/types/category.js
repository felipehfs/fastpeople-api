const knex = require('../../config/db');

module.exports = {
    videos(args) {
        return knex('videos').where({
            categories_id: args.id
        });
    }
}
const knex = require('../../config/db');

module.exports = {
    owner(videos) {
        return knex('users')
        .select('users.id', 'users.name', 'users.email')
        .where({
            id: videos.owner
        }).first();
    },
    category(videos) {
        if (!videos.categories_id) return null 
        return knex('categories')
            .select('*')
            .where({ id: videos.categories_id })
            .first();
    }
}
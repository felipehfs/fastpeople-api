const knex = require('../../config/db');

module.exports = {
    async allVideos() {
        try {
            const videos = await knex('videos')
                .select("*");
            return videos;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
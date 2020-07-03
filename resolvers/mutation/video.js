const knex = require("../../config/db");

module.exports = {
  async newVideo(_, args) {
    const {
      video: { name, owner, url, category },
    } = args;

    const [id] = await knex("videos").returning("id").insert({
      name,
      owner,
      url,
      categories_id: category,
      views: 0,
    });

    const videoCreated = await knex("videos")
      .select("*")
      .where({ id })
      .first();

    return videoCreated;
  },
};

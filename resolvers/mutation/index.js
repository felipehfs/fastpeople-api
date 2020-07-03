const user = require('./user');
const video = require('./video');
const category = require("./category");
const profile = require('./profile');

module.exports = {
    ...user,
    ...video,
    ...category,
    ...profile,
}
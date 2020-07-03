const video = require('./video');
const user = require('./user');
const category = require('./category');
const info = require('./info');
const profile = require('./profile');

module.exports = {
    ...video,
    ...user,
    ...category,
    ...info,
    ...profile,
}
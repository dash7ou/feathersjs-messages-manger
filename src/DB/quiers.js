const knex = require("knex");

module.exports = {
  users: {
    getUser: id => knex("users").where("id", id)
  }
};

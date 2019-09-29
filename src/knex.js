const knex = require("knex");

module.exports = function(app) {
  const { client, connection } = app.get("mysql2");
  const db = knex({ client, connection });

  app.set("knexClient", db);
};

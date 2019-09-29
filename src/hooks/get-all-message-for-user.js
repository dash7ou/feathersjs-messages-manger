// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "mohammed12345***",
    database: "new_feathers"
  }
});

const jwt = require("jsonwebtoken");

module.exports = (options = {}) => {
  return async context => {
    const { params } = context;
    const result = jwt.verify(
      context.params.headers.authorization,
      "wjWfetlyNsc+GNB1Mbb6dt7GL3w="
    );
    const userId = +result.sub;

    // console.log(userId);
    // const messages = await knex.from("users");
    // .join("users", "users.id", "=", "messages.user_id")messages = [];
    // .from("messages")
    // .innerJoin("users", "messages.user_id", "users.id")
    // // .on("users", "messages.user_id", "users.id")
    // .where("messages.user_id", "=", userId);

    const newContext = {
      ...context,
      params: {
        ...params,
        query: {
          user_id: userId
        }
      }
    };
    return newContext;
  };
};

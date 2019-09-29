// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const jwt = require("jsonwebtoken");
module.exports = (options = {}) => {
  return async context => {
    const result = jwt.verify(
      context.params.headers.authorization,
      "wjWfetlyNsc+GNB1Mbb6dt7GL3w="
    );
    const userId = result.sub;
    if (!userId) {
      throw new Error("no user");
    }
    context.params.query.userId = userId;
    console.log(context.params);
  };
};

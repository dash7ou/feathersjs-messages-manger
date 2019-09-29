// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const jwt = require("jsonwebtoken");
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.text) {
      throw new Error("A message must have text");
    }
    const result = jwt.verify(
      context.params.headers.authorization,
      "wjWfetlyNsc+GNB1Mbb6dt7GL3w="
    );
    const userId = result.sub;
    if (!userId) {
      throw new Error("no user");
    }
    context.data = {
      text: data.text,
      userId: userId
    };
    return context;
  };
};

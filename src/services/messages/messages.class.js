const { Service } = require("feathers-knex");
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

exports.Messages = class Messages extends Service {
  create(data, params) {
    const { text, userId } = data;
    const messageData = {
      text,
      user_id: userId
    };
    return super.create(messageData, params);
  }
  async update(id, data, params) {
    const { text, userId } = data;
    if (!text) {
      throw new Error("no text to updated old one");
    }

    const message = await knex("messages").where("id", id);

    if (message[0].user_id === +userId) {
      const updateData = { text: text, user_id: userId };
      return super.update(id, updateData);
    } else {
      throw new Error("not owner");
    }
  }
  async remove(id, params) {
    const { userId } = params;
    const message = await knex("messages").where("id", id);
    if (message[0].user_id === +userId) {
      return super.remove(id);
    } else {
      throw new Error("not owner");
    }
  }
  find(params) {
    const { query } = params;
    console.log(query);
    return super.find({ query });
  }
};

const { Service } = require("feathers-knex");
const knex = require("knex");

const { users } = require("../../DB/quiers");
exports.Users = class Users extends Service {
  create(data, params) {
    const { email, password, age } = data;

    if (!email || !password || !age) {
      throw new Error("Sorry there are some require feild");
    }

    const userData = {
      email,
      password,
      age
    };
    return super.create(userData, params);
  }
  update(id, data, params) {
    if (id === data.userId) {
      return super.update(id, data);
    } else {
      throw new Error("you are not the owner");
    }
  }
  remove(id, params) {
    const { user_id } = params;

    if (+id === user_id) {
      return super.remove(id, params);
    } else {
      throw new Error("you are not the owner");
    }
  }
  get(id, params) {
    return super.get(id);
  }
};

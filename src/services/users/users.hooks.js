const { authenticate } = require("@feathersjs/authentication").hooks;

const {
  hashPassword,
  protect
} = require("@feathersjs/authentication-local").hooks;

const getAuthBeforeUpdateDeleteUser = require('../../hooks/get-auth-before-update-delete-user');

const afterDeleteUser = require('../../hooks/after-delete-user');

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")], //
    get: [authenticate("jwt")], //
    create: [hashPassword("password")],
    update: [
      hashPassword("password"),
      authenticate("jwt"),
      getAuthBeforeUpdateDeleteUser()
    ], //
    patch: [
      hashPassword("password"),
      authenticate("jwt"),
      getAuthBeforeUpdateDeleteUser()
    ],
    remove: [authenticate("jwt"), getAuthBeforeUpdateDeleteUser()] //
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password")
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [afterDeleteUser()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

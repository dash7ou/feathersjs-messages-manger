const { authenticate } = require("@feathersjs/authentication").hooks;

const proccessMessageBeforeCreate = require('../../hooks/proccess_message_before_create');

const getUserIdAfterUpdateDelete = require('../../hooks/get_user_id_after_update_delete');

const getUseridFromAuthAfterGetMessages = require('../../hooks/get-userid-from-auth-after-get-messages');

const getAllMessageForUser = require('../../hooks/get-all-message-for-user');

module.exports = {
  before: {
    all: [], //authenticate('jwt')
    find: [getUseridFromAuthAfterGetMessages(), getAllMessageForUser()],
    get: [getUseridFromAuthAfterGetMessages(), getAllMessageForUser()],
    create: [proccessMessageBeforeCreate()],
    update: [getUserIdAfterUpdateDelete()],
    patch: [getUserIdAfterUpdateDelete()],
    remove: [getUserIdAfterUpdateDelete()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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

const db = require('../../models');
const exec = require('child-process-promise').exec;
const get = require('lodash').get;

function setup() {
  return exec('npx sequelize db:migrate:undo:all')
    .then(() => exec('npx sequelize db:migrate'));
}

function createTestUser(state) {
  return db.User.create({
    firstName: 'Dylan',
    lastName: 'Nissley',
    emailAddress: 'dylan.nissley@gmail.com'
  }).then(user => {
    state.testUser = user.toJSON()
  });
}

function createUser({ firstName, lastName, emailAddress, state }) {
  return db.User.create({
    firstName,
    lastName,
    emailAddress
  }).then(user => {
    if (!state.createdUsers) state.createdUsers = [];
    state.createdUsers.push(user.toJSON());
  });
}

function assignEntitlement({ userId, entitlementId, state }) {
  return db.UserEntitlement.create({
    userId,
    entitlementId
  }).then(entitlement => {
    if (!state.createdEntitlements) state.createdEntitlements = [];
    state.createdEntitlements.push(entitlement.toJSON());
  });
}

module.exports = {
  setup,
  createTestUser,
  createUser,
  assignEntitlement
};

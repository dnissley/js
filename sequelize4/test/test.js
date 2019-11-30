const assert = require('chai').assert;
const db = require('../models');
const dbUtils = require('./utils/dbUtils');

describe('sequelize functionality', function() {
  beforeEach(function() {
    return dbUtils.setup();
  });

  after(function() {
    db.sequelize.close();
  });

  it('should insert user records', async function() {
    const state = {};
    const userFields = {
      firstName: 'Dylan',
      lastName: 'Nissley',
      emailAddress: 'dylan.nissley@gmail.com'
    };

    await dbUtils.createTestUser(state);

    assert.containsAllKeys(state.testUser, ['id', 'createdAt', 'updatedAt']);
    assert.ownInclude(state.testUser, userFields);
  });

  it('should insert entitlement records for a user', async function() {
    const state = {};

    await dbUtils.createTestUser(state)
      .then(() => dbUtils.assignEntitlement({ userId: state.testUser.id, entitlementId: 1, state }));

    assert.equal(state.createdEntitlements.length, 1);
    assert.containsAllKeys(state.createdEntitlements[0], ['id', 'createdAt', 'updatedAt']);
    assert.ownInclude(state.createdEntitlements[0], { userId: state.testUser.id, entitlementId: 1 });
  });

  it('should find created user record by user id', async function() {
    const state = {};

    await Promise.all([
      dbUtils.createUser({ firstName: 'User', lastName: 'One', emailAddress: 'user1@example.com', state }),
      dbUtils.createUser({ firstName: 'User', lastName: 'Two', emailAddress: 'user2@example.com', state }),
      dbUtils.createUser({ firstName: 'User', lastName: 'Three', emailAddress: 'user3@example.com', state })
    ]).then(() => {
      state.searchedUser = state.createdUsers[0];
      return db.User.findOne({
        where: { id: state.createdUsers[0].id }
      });
    }).then(foundUser => {
      state.foundUser = foundUser.toJSON();
    });

    assert.equal(state.foundUser.id, state.searchedUser.id);
    assert.equal(state.foundUser.firstName, state.searchedUser.firstName);
    assert.equal(state.foundUser.lastName, state.searchedUser.lastName);
    assert.equal(state.foundUser.emailAddress, state.searchedUser.emailAddress);
  });

  it('should find created user record with associated entitlements', async function() {
    const state = {};

    await dbUtils.createTestUser(state)
      .then(() => dbUtils.assignEntitlement({ userId: state.testUser.id, entitlementId: 2, state }))
      .then(() => dbUtils.assignEntitlement({ userId: state.testUser.id, entitlementId: 1, state }))
      .then(() => db.User.findByIdWithEntitlements(state.testUser.id))
      .then(user => state.userWithEntitlements = user.toJSON());
    
    assert.equal(state.userWithEntitlements.Entitlements.length, 2);
    
    assert.ownInclude(state.userWithEntitlements.Entitlements[0], { id: 1 });
    assert.ownInclude(state.userWithEntitlements.Entitlements[1], { id: 2 });
  });

  it('should find created user record with no associated entitlements', async function() {
    const state = {};

    await dbUtils.createTestUser(state)
      .then(() => db.User.findByIdWithEntitlements(state.testUser.id))
      .then(user => state.userWithEntitlements = user.toJSON());
    
    assert.equal(state.userWithEntitlements.Entitlements.length, 0);
  });

  // Further tests/examples:
  // - deletion
  // - error tests (violating constraints, etc)
  // - inner join example (e.g. exclude records with no associations)
  // - raw sql queries
  // - other sequelize functionality (scopes? deletedAt?)
  // - more complex queries
  // - functions/ops/aggregates
});

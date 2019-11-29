require('dotenv').config();
const db = require('./models');

db.User.create({
  firstName: 'Dylan',
  lastName: 'Nissley',
  emailAddress: 'dylan.nissley@gmail.com'
}).then(user => {
  console.log('CREATED USER: ' + JSON.stringify(user.toJSON()));
  return db.UserEntitlement.create({
    userId: user.id,
    entitlementId: 1
  });
}).then(entitlement => {
  console.log('CREATED ENTITLEMENT: ' + JSON.stringify(entitlement.toJSON()));
  return db.User.findByIdWithEntitlements(1);
}).then(user => {
  console.log('FOUND USER: ' + JSON.stringify(user.toJSON()));
  return db.UserEntitlement.findByUserId(1);
}).then(userEntitlements => {
  console.log('FOUND ENTITLEMENTS: ' + JSON.stringify(userEntitlements.map(ue => ue.toJSON())));
});

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      emailAddress: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }).then(() => {
      return queryInterface.createTable('Entitlements', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    }).then(() => {
      return queryInterface.bulkInsert('Entitlements', [{
        id: 1,
        name: 'CanChangePasswordWithoutOldPassword',
        description: 'Allows user to change password without having old password.'
      }, {
        id: 2,
        name: 'ChatSupport',
        description: 'Allows user to initiate customer support chats'
      }]);
    }).then(() => {
      return queryInterface.createTable('UserEntitlements', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
        },
        entitlementId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Entitlements',
            key: 'id'
          },
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserEntitlements')
      .then(() => queryInterface.dropTable('Entitlements'))
      .then(() => queryInterface.dropTable('Users'));
  }
};

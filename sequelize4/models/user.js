module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    emailAddress: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  });

  const associatedModels = {};

  User.associate = function(models) {
    User.belongsToMany(models.Entitlement, { through: models.UserEntitlement, foreignKey: 'userId' });
    associatedModels.Entitlement = models.Entitlement;
  };

  User.findByIdWithEntitlements = function(id) {
    return User.findOne({
      where: { id },
      include: [ associatedModels.Entitlement ]
    });
  };

  return User;
};

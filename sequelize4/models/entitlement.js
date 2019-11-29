module.exports = (sequelize, DataTypes) => {
  const Entitlement = sequelize.define('Entitlement', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });

  Entitlement.associate = function(models) {
    Entitlement.belongsToMany(models.User, { through: models.UserEntitlement, foreignKey: 'entitlementId' });
  };

  return Entitlement;
};

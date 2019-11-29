module.exports = (sequelize, DataTypes) => {
  const UserEntitlement = sequelize.define('UserEntitlement', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  });

  UserEntitlement.findByUserId = function(userId) {
    return UserEntitlement.findAll({
      where: { userId }
    });
  };

  return UserEntitlement;
};

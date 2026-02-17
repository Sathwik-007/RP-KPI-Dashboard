export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return User;
};
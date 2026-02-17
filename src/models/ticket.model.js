export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Open", "In Progress", "Done"),
      defaultValue: "Open",
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High", "Critical"),
      defaultValue: "Medium",
    },
    spaceOrProject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Ticket;
};
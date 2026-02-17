import db from "../models/index.js";
import { Op, Sequelize } from "sequelize";

const { Ticket } = db;

export const getDashboardStats = async (filters, userOrgId) => {
  const whereClause = {
    organizationId: userOrgId,
  };

  if (filters.status) whereClause.status = filters.status;
  if (filters.priority) whereClause.priority = filters.priority;
  if (filters.space) whereClause.spaceOrProject = filters.space;

  if (filters.startDate && filters.endDate) {
    whereClause.createdAt = {
      [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)],
    };
  }

  // Execute all queries in parallel for better performance
  const [
    totalTickets,
    closedTickets,
    openTickets,
    overdueTickets,
    ticketsByStatus,
    ticketsByPriority,
  ] = await Promise.all([
    Ticket.count({ where: whereClause }),
    Ticket.count({ where: { ...whereClause, status: "Done" } }),
    Ticket.count({ where: { ...whereClause, status: "Open" } }),
    Ticket.count({
      where: {
        ...whereClause,
        dueDate: { [Op.lt]: new Date() },
        status: { [Op.ne]: "Done" },
      },
    }),
    // we are grouping tickets by status. This is equivalent to GROUPBY(status) and then return the count in SQL
    Ticket.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: whereClause,
      group: ["status"],
      raw: true,
    }),
    // here with priority using aggregate function. This is equivalent to GROUPBY(priority) adn return count in SQL
    Ticket.findAll({
      attributes: [
        "priority",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"], // COUNT(*) AS "count" in json;
      ],
      where: whereClause,
      group: ["priority"],
      raw: true,
    }),
  ]);

  return {
    kpi: {
      total: totalTickets,
      open: openTickets,
      closed: closedTickets,
      overdue: overdueTickets,
    },
    charts: {
      byStatus: ticketsByStatus,
      byPriority: ticketsByPriority,
    },
  };
};
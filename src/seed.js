import db from "./models/index.js";

const seed = async () => {
  await db.sequelize.sync();

  // Create a User (so you can login)
  const user = await db.User.create({
    email: "admin@test.com",
    password: "password123",
    organizationId: 1
  });

  console.log("✅ User created: admin@test.com / password123");

  // Create Dummy Tickets
  const tickets = [
    { title: "Fix Login Bug", status: "Open", priority: "High", spaceOrProject: "Auth", organizationId: 1 },
    { title: "Design Home Page", status: "In Progress", priority: "Medium", spaceOrProject: "UI", organizationId: 1 },
    { title: "Setup Database", status: "Done", priority: "Critical", spaceOrProject: "Backend", organizationId: 1 },
    { title: "API Documentation", status: "Open", priority: "Low", spaceOrProject: "Docs", organizationId: 1 },
    { title: "Unit Testing", status: "Done", priority: "High", spaceOrProject: "QA", organizationId: 1 },
    // Overdue Ticket (Due date in the past)
    { title: "Legacy Code Cleanup", status: "Open", priority: "Low", spaceOrProject: "Backend", organizationId: 1, dueDate: new Date("2023-01-01") }
  ];

  await db.Ticket.bulkCreate(tickets);
  console.log("✅ 6 Dummy Tickets created!");
};

seed().then(() => process.exit());
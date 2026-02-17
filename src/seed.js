import db from "./models/index.js";

const seed = async () => {
  await db.sequelize.sync();

  // Create test Users
  await db.User.create({
    email: "admin@test.com",
    password: "password123",
    organizationId: 1
  });

  await db.User.create({
    email: "user@test.com",
    password: "password12345",
    organizationId: 2
  });

  console.log("✅ User created: admin@test.com / password123. Organisation ID: 1");
  console.log("✅ User created: user@test.com / password12345. Organisation ID: 2");
  

  // Create Dummy Tickets
  const tickets = [
    { title: "Fix Login Bug", status: "Open", priority: "High", spaceOrProject: "Auth", organizationId: 1 },
    { title: "Design Home Page", status: "In Progress", priority: "Medium", spaceOrProject: "UI", organizationId: 1 },
    { title: "Setup Database", status: "Done", priority: "Critical", spaceOrProject: "Backend", organizationId: 1 },
    { title: "API Documentation", status: "Open", priority: "Low", spaceOrProject: "Docs", organizationId: 1 },
    { title: "Unit Testing", status: "Done", priority: "High", spaceOrProject: "QA", organizationId: 1 },
    { title: "API Documentation", status: "Open", priority: "Low", spaceOrProject: "Docs", organizationId: 2 },
    { title: "Unit Testing", status: "Done", priority: "High", spaceOrProject: "QA", organizationId: 2 },
    // Overdue Ticket (Due date in the past)
    { title: "Legacy Code Cleanup", status: "Open", priority: "Low", spaceOrProject: "Backend", organizationId: 1, dueDate: new Date("2023-01-01") }
  ];

  await db.Ticket.bulkCreate(tickets);
  console.log(`✅ ${tickets.length} Dummy Tickets created!`);
};

seed().then(() => process.exit());
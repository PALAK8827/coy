require('dotenv').config();
const app = require('./app');
const { seedData } = require('./seed/seeder');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('Initializing database and seeding mock profiles...');
    await seedData();

    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(` Coy Backend Server running on port ${PORT}`);
      console.log(` Local URL: http://localhost:${PORT}`);
      console.log(` Endpoints:`);
      console.log(`   - GET  http://localhost:${PORT}/feed`);
      console.log(`   - POST http://localhost:${PORT}/swipe`);
      console.log(`   - GET  http://localhost:${PORT}/matches`);
      console.log(`===============================================`);
    });

    // Handle process signals
    const shutdown = () => {
      console.log('Shutting down backend server...');
      server.close(() => {
        console.log('Server closed gracefully.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

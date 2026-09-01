require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Auto-sync models in development
    console.log('PostgreSQL Database Connected Successfully');
    app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failure:', error);
    process.exit(1);
  }
})();
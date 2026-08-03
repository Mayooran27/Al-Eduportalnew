const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify for async/await
const promisePool = pool.promise();

// Create tables if they don't exist
const initDatabase = async () => {
  try {
    // Create database if not exists
    await promisePool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await promisePool.query(`USE ${process.env.DB_NAME}`);

    // Create registrations table
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        sex ENUM('male', 'female') NOT NULL,
        date_of_birth DATE NOT NULL,
        nic_number VARCHAR(20) NOT NULL UNIQUE,
        nic_front_path VARCHAR(255),
        nic_back_path VARCHAR(255),
        school_photo_path VARCHAR(255),
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Initialize database
initDatabase();

module.exports = promisePool;
const pool = require('../config/database');

class Registration {
  static async create(registrationData) {
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      nicNumber,
      nicFrontPath,
      nicBackPath,
      schoolPhotoPath
    } = registrationData;

    const query = `
      INSERT INTO registrations 
      (first_name, last_name, sex, date_of_birth, nic_number, nic_front_path, nic_back_path, school_photo_path)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      firstName,
      lastName,
      sex,
      dateOfBirth,
      nicNumber,
      nicFrontPath || null,
      nicBackPath || null,
      schoolPhotoPath || null
    ];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('NIC number already exists');
      }
      throw error;
    }
  }

  static async findByNIC(nicNumber) {
    const query = 'SELECT * FROM registrations WHERE nic_number = ?';
    const [rows] = await pool.query(query, [nicNumber]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM registrations WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  static async getAll(limit = 100, offset = 0) {
    const query = 'SELECT * FROM registrations ORDER BY registration_date DESC LIMIT ? OFFSET ?';
    const [rows] = await pool.query(query, [limit, offset]);
    return rows;
  }

  static async updateStatus(id, status) {
    const query = 'UPDATE registrations SET status = ? WHERE id = ?';
    const [result] = await pool.query(query, [status, id]);
    return result.affectedRows > 0;
  }
}

module.exports = Registration;
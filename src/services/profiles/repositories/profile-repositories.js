import { Pool } from 'pg';

class ProfileRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getProfilesById(userId) {
    const query = {
      text: 'SELECT id, name, email, role FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getProfileByApplication(userId) {
    const query = {
      text: `SELECT a.id as application_id, j.title, j.id as job_id, j.title
             FROM applications a 
             JOIN jobs j ON a.job_id = j.id 
             WHERE a.user_id = $1`,
      values: [userId],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getProfileByBookmark(userId) {
    const query = {
      text: `SELECT b.id as bookmark_id, j.title, j.id as job_id, j.title
             FROM bookmarks b 
             JOIN jobs j ON b.job_id = j.id 
             WHERE b.user_id = $1`,
      values: [userId],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }
}

const profileRepositories = new ProfileRepositories();
export default profileRepositories;
import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class CompanyRepositories {
  constructor() {
    this.pool = new Pool();
  };

  async createCompany({ name, location, description }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO companies (id, name, location, description) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, location, description],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async getCompanies() {
    const query = 'SELECT * FROM companies';
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: 'SELECT * FROM companies WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  }

  async editCompany({ id, name, location, description }) {
    const query = {
      text: 'UPDATE companies SET name = $1, location = $2, description = $3 WHERE id = $4 RETURNING id',
      values: [name, location, description, id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0].id;
  }

  async deleteCompany(id) {
    const query = {
      text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0].id;
  }
}

const companyRepositories = new CompanyRepositories();
export default companyRepositories;
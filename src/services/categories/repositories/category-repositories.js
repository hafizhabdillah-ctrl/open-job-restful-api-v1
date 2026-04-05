import { nanoid } from 'nanoid';
import { Pool } from 'pg';

class CategoryRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createCategory({ name }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO categories VALUES($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async getCategories() {
    const query = 'SELECT * FROM categories';
    const result = await this.pool.query(query);

    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  }

  async editCategory({ id, name }) {
    const query = {
      text: 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING id',
      values: [name, id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0].id;
  }

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0].id;
  }
}

const categoryRepositories = new CategoryRepositories();
export default categoryRepositories;
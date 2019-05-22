import '@babel/polyfill';

require('dotenv').config();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');

const QuickCredit = {
  async createUser(req, res, hash, token) {
    const text = `INSERT INTO
      users(first_name, last_name, email, password, token)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.value.body.firstName,
      req.value.body.lastName,
      req.value.body.email,
      hash,
      token,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({ status: 201, data: rows[0] });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async updateSignupToken(req, res, token) {
    const updateOneQuery = `UPDATE users
      SET token=$2
      WHERE email=$1 returning *`;
    const values = [
      req.value.body.email,
      token,
    ];
    try {
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json({ status: 200, data: response.rows[0] });
    } catch (err) {
      return res.status(400).json({ status: 400, data: err });
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async signIn(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.value.body.email]);
      if (rows[0]) {
        const user = rows[0];
        return bcrypt.compare(req.value.body.password, user.password, (err, isMatch) => {
          if (isMatch) {
            return jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET_KEY, { expiresIn: '86400s' }, (error, token) => {
              if (token) {
                return QuickCredit.updateSignupToken(req, res, token);
              }
              return res.status(400).json({ status: 400, data: error });
            });
          }
          return res.status(400).json({ status: 400, error: 'invalid login details' });
        });
      }
      return res.status(400).json({ status: 400, error: 'invalid login details' });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },
  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
    const updateOneQuery = `UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = QuickCredit;

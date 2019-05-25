import '@babel/polyfill';

require('dotenv').config();
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db');

const QuickCredit = {
  async createUser(req, res, hash, token) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1';
    const vals = [
      req.value.body.email,
    ];
    try {
      const { rows } = await db.query(findAllQuery, vals);
      if (rows[0]) return res.status(409).json({ status: 409, error: 'email address already exists, kindly enter a different email address' });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
    const text = `INSERT INTO
      users(first_name, last_name, email, password, token, is_admin)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.value.body.firstName,
      req.value.body.lastName,
      req.value.body.email,
      hash,
      token,
      false,
    ];

    try {
      const { rows } = await db.query(text, values);
      const { first_name, last_name, email, status, token, created_date } = rows[0];
      const result = { first_name, last_name, email, status, token, created_date };
      return res.status(201).json({ status: 201, message: 'user created successfully', data: result });
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
      const { first_name, last_name, email, status, token, created_date } = response.rows[0];
      const result = { first_name, last_name, email, status, token, created_date };
      return res.status(200).json({ status: 200, data: result });
    } catch (err) {
      return res.status(400).json({ status: 400, data: err });
    }
  },
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users WHERE is_admin = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [false]);
      return res.status(200).json({ status: 200, count: rowCount, data: rows });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async getClientsByStatus(req, res) {
    const findAllQuery = 'SELECT * FROM users WHERE status = $1 AND is_admin = $2';
    const values = [
      req.value.query.status,
      false,
    ];
    try {
      const { rows, rowCount } = await db.query(findAllQuery, values);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: `no clients with ${req.value.query.status} status` });
      }
      return res.status(200).json({ status: 200, count: rowCount, data: rows });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async getAClientByEmail(req, res, authData) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1 AND is_admin = $2';
    const values = [
      req.value.params.email,
      false,
    ];
    try {
      const { rows } = await db.query(findAllQuery, values);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'client with given email not found' });
      }
      if ((authData.is_admin === true) || (authData.email === req.value.params.email)) {
        return res.status(200).json({ status: 200, data: rows[0] });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
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

  async completeProfileDB(req, res, authData) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1 AND is_admin = $2';
    try {
      const { rows } = await db.query(findAllQuery, [req.value.params.email, false]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'client with given email not found' });
      }
      if ((authData.is_admin === false) || (authData.email === req.value.params.email)) {
        if (rows[0].completedProfileAt) return res.status(401).json({ status: 401, error: 'client already completed profile, use the update feature to update profile' });
        const updateOneQuery = `UPDATE users 
        SET sex=$1,date_of_birth=$2,valid_id_url=$3,display_picture_url=$4,phone_number=$5,home_address=$6,home_city=$7,home_state=$8,employment_status=$9,employer_name=$10,work_address=$11,work_city=$12,work_state=$13,bvn=$14,bank=$15,account_number=$16,status=$17,completed_profile_at=$18
        WHERE email=$19 returning *`;
        const values = [
          req.value.body.sex,
          req.value.body.dob,
          req.value.body.validIdUrl,
          req.value.body.displayPictureUrl,
          req.value.body.phoneNumber,
          req.value.body.homeAddress,
          req.value.body.homeCity,
          req.value.body.homeState,
          req.value.body.employmentStatus,
          req.value.body.employerName,
          req.value.body.workAddress,
          req.value.body.workCity,
          req.value.body.workState,
          req.value.body.bvn,
          req.value.body.bank,
          req.value.body.accountNumber,
          'pending',
          new Date().toLocaleString(),
          req.value.params.email,
          
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json({ status: 200, data: response.rows[0] });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (err) {
      res.status(400).json({ status: 400, data: err });
    }
  },

  async verifyClientDB(req, res, authData) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(findAllQuery, [req.value.params.email]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'client with given email not found' });
      }
      if (authData.is_admin === true) {
        if (!rows[0].completed_profile_at) return res.status(403).json({ status: 403, error: 'client cannot be verified, complete profile first' });
        if (rows[0].status === 'verified') return res.status(403).json({ status: 403, error: 'client is already marked as verified' });
        if (rows[0].status === 'unverified') return res.status(403).json({ status: 403, error: 'client is already marked as unverified' });
        const updateOneQuery = `UPDATE users 
        SET status=$1,verified_at=$2 
        WHERE email=$3 returning *`;
        const values = [
          'verified',
          new Date().toLocaleString(),
          req.value.params.email,
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json({ status: 200, data: response.rows[0] });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (err) {
      res.status(400).json({ status: 400, data: err });
    }
  },

  async unVerifyClientDB(req, res, authData) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(findAllQuery, [req.value.params.email]);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'client with given email not found' });
      }
      if (authData.is_admin === true) {
        if (!rows[0].completed_profile_at) return res.status(403).json({ status: 403, error: 'client cannot be unverified, complete profile first' });
        if (rows[0].status === 'unverified') return res.status(403).json({ status: 403, error: 'client is already marked as unverified' });
        if (rows[0].status === 'verified') return res.status(403).json({ status: 403, error: 'client is already marked as verified' });
        const updateOneQuery = `UPDATE users 
        SET status=$1,unverified_at=$2 
        WHERE email=$3 returning *`;
        const values = [
          'unverified',
          new Date().toLocaleString(),
          req.value.params.email,
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).json({ status: 200, data: response.rows[0] });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (err) {
      res.status(400).json({ status: 400, data: err });
    }
  },

  async createALoanDB(req, res, authData) {
    const findUserQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [
      req.value.body.email,
    ];
    try {
      const { rows } = await db.query(findUserQuery, values);
      const user = rows[0];
      if (!user) return res.status(404).json({ status: 404, error: 'Client with email doesn\'t exist, you need to sign up first' });
      if (authData.is_admin === false) {
        if (user.status !== 'verified') return res.status(403).json({ status: 403, error: 'user cannot apply for loan because user is not verified' });
        // const userLoans = LoanModel.getAUserLoans(user.email);
        const findAllQuery = 'SELECT * FROM loans WHERE user_id = $1 AND (status = $2 OR repaid = $3)';
        console.log(user);
        const val = [
          user.id, 'pending', false,
        ];
        try {
          const { rows } = await db.query(findAllQuery, val);
          const userPendingOrCurrentLoans = rows;
          if (userPendingOrCurrentLoans.length !== 0) return res.status(403).json({ status: 403, error: 'user cannot apply for more than one loan at a time' });
          const text = `INSERT INTO 
          loans(user_id, status, tenor, amount, interest, created_at) 
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
          const vals = [
            user.id,
            'pending',
            req.value.body.tenor,
            req.value.body.amount,
            0.05 * parseInt(req.value.body.amount, 10),
            new Date().toLocaleString(),
          ];
          try {
            const { rows } = await db.query(text, vals);
            return res.status(201).json({ status: 201, message: 'loan created successfully', data: rows[0] });
          } catch (error) {
            return res.status(400).json({ status: 400, data: error });
          }
        } catch (error) {
          return res.status(400).json({ status: 400, data: error });
        }
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async getAllLoansDB(req, res) {
    const findAllQuery = 'SELECT * FROM loans';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).json({ status: 200, count: rowCount, data: rows });
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async getALoanDB(req, res, authData) {
    const findLoanQuery = 'SELECT * FROM loans WHERE loan_id = $1';
    const values = [
      parseInt(req.value.params.loanId, 10),
    ];
    try {
      const { rows } = await db.query(findLoanQuery, values);
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'loan with given loan ID not found' });
      }
      const loan = rows[0];
      const findAllQuery = 'SELECT * FROM users WHERE email = $1';
      const vals = [
        authData.email,
      ];
      try {
        const { rows } = await db.query(findAllQuery, vals);
        const user = rows[0];
        if ((authData.is_admin === true) || (loan.user_id === user.id)) {
          return res.status(200).json({ status: 200, data: loan });
        }
        return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
      } catch (error) {
        return res.status(400).json({ status: 400, data: error });
      }
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async approveOrRejectLoanDB(req, res, authData) {
    const findLoanQuery = 'SELECT * FROM loans WHERE loan_id = $1';
    const values = [
      parseInt(req.value.params.loanId, 10),
    ];
    try {
      const { rows } = await db.query(findLoanQuery, values);
      const loan = rows[0];
      if (!rows[0]) {
        return res.status(404).json({ status: 404, error: 'loan with given loan ID not found' });
      }
      if (authData.is_admin === true) {
        if (req.value.body.status === 'approved') {
          if (rows[0].status === 'approved') return res.status(403).json({ status: 403, error: 'loan has already being approved' });
          if (rows[0].status === 'rejected') return res.status(403).json({ status: 403, error: 'loan cannot be approved, it has already being rejected' });
          const updateOneQuery = `UPDATE loans 
          SET status=$1,approved_at=$2 
          WHERE loan_id=$3 returning *`;
          const vals = [
            'approved',
            new Date().toLocaleString(),
            parseInt(req.value.params.loanId, 10),
          ];
          const response = await db.query(updateOneQuery, vals);
          for (let i = 1; i <= loan.tenor; i += 1) {
            QuickCredit.createRepayments(req, res, loan, i);
          }
          return res.status(200).json({ status: 200, data: response.rows[0] });
        }

        if (req.value.body.status === 'rejected') {
          if (rows[0].status === 'rejected') return res.status(403).json({ status: 403, error: 'loan has already being rejected' });
          if (rows[0].status === 'approved') return res.status(403).json({ status: 403, error: 'loan cannot be rejected, it has already being approved' });
          const updateRejectedQuery = `UPDATE loans 
          SET status=$1,rejected_at=$2 
          WHERE loan_id=$3 returning *`;
          const val = [
            'rejected',
            new Date().toLocaleString(),
            parseInt(req.value.params.loanId, 10),
          ];
          const response = await db.query(updateRejectedQuery, val);
          return res.status(200).json({ status: 200, data: response.rows[0] });
        }
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    } catch (err) {
      res.status(400).json({ status: 400, data: err });
    }
  },

  async getAClient(req, res) {
    const findAllQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [
      req.value.body.email,
    ];
    try {
      const { rows } = await db.query(findAllQuery, values);
      return rows;
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async getAClientCurrentLoans(req, res, user) {
    const findAllQuery = 'SELECT * FROM loans WHERE user_id = $1 AND (status = $2 OR repaid = $3';
    const values = [
      user.id, 'pending', false,
    ];
    try {
      const { rows } = await db.query(findAllQuery, values);
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },

  async createRepayments(req, res, loan, i) {
    const text = `INSERT INTO 
    repayments(loan_id, status, due_date, created_at)
    VALUES($1, $2, $3, $4)
    returning *`;
    const vall = [
      loan.loan_id,
      'pending',
      moment().add(i * 30, 'days'),
      new Date().toLocaleString(),
    ];

    try {
      const { rows } = await db.query(text, vall);
      return rows;
    } catch (error) {
      return res.status(400).json({ status: 400, data: error });
    }
  },
};

module.exports = QuickCredit;

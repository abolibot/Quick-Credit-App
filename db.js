const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});


/**
 * Create Tables
 */
const createUsersTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        sex VARCHAR(10),
        date_of_birth DATE,
        valid_id_url VARCHAR(255),
        display_picture_url VARCHAR(255),
        phone_number VARCHAR(11),
        home_address VARCHAR(255),
        home_city VARCHAR(50),
        home_state VARCHAR(50),
        employment_status VARCHAR(20),
        employer_name VARCHAR(255),
        work_address VARCHAR(255),
        work_city VARCHAR(255),
        work_state VARCHAR(255),
        bvn VARCHAR(11),
        bank VARCHAR(255),
        account_number VARCHAR(10),
        password VARCHAR(255),
        is_admin BOOLEAN NOT NULL DEFAULT false,
        status VARCHAR(11),
        completed_profile_at TIMESTAMPTZ,
        verified_at TIMESTAMPTZ,
        unverified_at TIMESTAMPTZ,
        token TEXT,
        modified_date TIMESTAMPTZ,
        created_date TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (email)
      )
  `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLoansTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    loans(
      loan_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      status VARCHAR(10) NOT NULL,
      repaid BOOLEAN,
      tenor NUMERIC NOT NULL, 
      amount MONEY NOT NULL,
      monthly_installment MONEY,
      balance MONEY,
      interest MONEY NOT NULL,
      approved_at TIMESTAMP,
      rejected_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    )
  `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createRepaymentsTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    repayments(
        id SERIAL PRIMARY KEY,
        loan_id INT REFERENCES loans(loan_id) ON DELETE CASCADE,
        status VARCHAR(25) NOT NULL,
        due_date DATE NOT NULL,
        paid_amount MONEY,
        logged_at TIMESTAMP,
        posted_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      )
  `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users cascade';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLoansTable = () => {
  const queryText = 'DROP TABLE IF EXISTS loans cascade';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropRepaymentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS repayments cascade';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTable,
  createLoansTable,
  createRepaymentsTable,
  dropUsersTable,
  dropLoansTable,
  dropRepaymentsTable,
};

require('make-runnable');

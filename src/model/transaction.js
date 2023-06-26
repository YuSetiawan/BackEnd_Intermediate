const Pool = require('../config/db'); // import var Pool dari db.js

const selectAllTransaction = ({sortby, sort, limit, offset}) => {
  return Pool.query(
    `SELECT transaction.*, users.name AS buyer_name, users.phone_number, product.name, product.price FROM transaction INNER JOIN users ON transaction.users_email = users.email INNER JOIN product ON transaction.id_product = product.id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectTransaction = (id) => {
  return Pool.query(`SELECT * FROM transaction WHERE id =${id}`);
};

const insertTransaction = (data) => {
  const {id, payment_method, users_email, id_product, transaction_date} = data;
  return Pool.query(`INSERT INTO transaction(id, payment_method, users_email, id_product, transaction_date)
  VALUES (${id}, '${payment_method}', '${users_email}', '${id_product}', '${transaction_date}')`);
};

const updateTransaction = (data) => {
  const {id, payment_method, users_email, id_product, transaction_date} = data;
  return Pool.query(`UPDATE transaction SET payment_method='${payment_method}', users_email='${users_email}', id_product='${id_product}', transaction_date ='${transaction_date}' WHERE id ='${id}'`);
};

const deleteTransaction = (id) => {
  return Pool.query(`DELETE FROM transaction WHERE id='${id}'`);
};

const countTransaction = () => {
  return Pool.query(`SELECT COUNT(*) FROM transaction`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM transaction WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllTransaction,
  selectTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  countTransaction,
  findId,
};

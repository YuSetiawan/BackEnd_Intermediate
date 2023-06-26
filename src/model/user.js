const Pool = require('../config/db'); // import var Pool dari db.js

const createUser = (data) => {
  const {id, name, email, passwordHash, phone_number, gender, birth_date, role} = data;
  return Pool.query(`INSERT INTO users(id, name, email, password, phone_number, gender, birth_date, role)
  VALUES ('${id}', '${name}', '${email}', '${passwordHash}','${phone_number}', '${gender}', '${birth_date}', '${role}')`);
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  createUser,
  findEmail,
};

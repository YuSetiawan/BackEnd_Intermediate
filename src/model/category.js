const Pool = require('../config/db'); // import var Pool dari db.js

const selectAllCategory = ({sortby, sort, limit, offset}) => {
  return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectCategory = (id) => {
  return Pool.query(`SELECT * FROM category WHERE id ='${id}'`);
};

const insertCategory = (data) => {
  const {id, name, photo} = data;
  return Pool.query(`INSERT INTO category(id, name, photo)
  VALUES (${id}, '${name}', '${photo}')`);
};

const updateCategory = (data) => {
  const {id, name, photo} = data;
  return Pool.query(`UPDATE category SET name='${name}', photo='${photo}' WHERE id ='${id}'`);
};

const deleteCategory = (id) => {
  return Pool.query(`DELETE FROM category WHERE id='${id}'`);
};

const countCategory = () => {
  return Pool.query(`SELECT COUNT(*) FROM category`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM category WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findName = (name) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM category WHERE name ILIKE '%${name}%'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countCategory,
  findId,
  findName,
};

const Pool = require('../config/db'); // import var Pool dari db.js

const selectAllProduct = ({sortby, sort, limit, offset}) => {
  return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectProduct = (id) => {
  return Pool.query(`SELECT * FROM product WHERE id ='${id}'`);
};

const insertProduct = (data) => {
  const {id, name, stock, price, photo, rate, brand, id_category} = data;
  return Pool.query(`INSERT INTO product(id, name, stock, price, photo, rate, brand, id_category)
  VALUES ('${id}', '${name}', ${stock}, ${price}, '${photo})', ${rate}, '${brand}', ${id_category})`);
};

const updateProduct = (data) => {
  const {id, name, stock, price, photo, rate, brand, id_category} = data;
  return Pool.query(`UPDATE product SET name='${name}', stock=${stock}, price=${price}, photo='${photo}', rate=${rate}, brand='${brand}', id_category='${id_category}' WHERE id ='${id}'`);
};

const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id='${id}'`);
};

const countProduct = () => {
  return Pool.query(`SELECT COUNT(*) FROM product`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM product WHERE id='${id}'`, (error, result) => {
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
    Pool.query(`SELECT * FROM product WHERE name ILIKE '%${name}%'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  findId,
  findName,
};

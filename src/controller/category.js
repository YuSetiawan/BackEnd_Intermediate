let {selectAllCategory, selectCategory, insertCategory, updateCategory, deleteCategory, countCategory, findId, findName} = require('../model/category');
const client = require('../config/redis');
const commonHelper = require('../helper/common');

let categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      let result = await selectAllCategory({limit, offset, sortby, sort});
      const {
        rows: [count],
      } = await countCategory();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, 'get data success', pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getDetailCategory: async (req, res) => {
    const id = Number(req.params.id); // selarasin id parameter/link sama id variabel product
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    selectCategory(id)
      .then((result) => {
        client.setEx(`category/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  getNameCategory: async (req, res) => {
    const name = req.query.keyword || '';
    await findName(name)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  createCategory: async (req, res) => {
    // post buat nambahin data ke variable
    const PORT = process.env.PORT || 3000;
    const PGHOST = process.env.PGHOST || 'localhost';
    const photo = req.file.filename;
    let {name} = req.body;
    const {
      rows: [count],
    } = await countCategory();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
      photo: `http://${PGHOST}:${PORT}/img/${photo}`,
    };
    insertCategory(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Product created'))
      .catch((err) => res.send(err));
  },
  updateCategory: async (req, res) => {
    // put buat update data variable
    const PORT = process.env.PORT || 3000;
    const PGHOST = process.env.PGHOST || 'localhost';
    const photo = req.file.filename;
    const id = Number(req.params.id);
    let {name} = req.body;
    const {rowCount} = await findId(id);
    if (!rowCount) {
      res.json({message: 'ID is Not Found'});
    }
    const data = {
      id,
      name,
      photo: `http://${PGHOST}:${PORT}/img/${photo}`,
    };
    updateCategory(data)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Category updated'))
      .catch((err) => res.send(err));
  },
  deleteCategory: async (req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    deleteCategory(id)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Category deleted'))
      .catch((err) => res.send(err));
  },
};

module.exports = categoryController;

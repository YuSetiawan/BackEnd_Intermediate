let {selectAllTransaction, selectTransaction, insertTransaction, updateTransaction, deleteTransaction, countTransaction, findId} = require('../model/transaction');

const commonHelper = require('../helper/common');
let transactionController = {
  getAllTransaction: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      let result = await selectAllTransaction({limit, offset, sortby, sort});
      const {
        rows: [count],
      } = await countTransaction();
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
  getDetailTransaction: async (req, res) => {
    const id = Number(req.params.id); // selarasin id parameter/link sama id variabel product
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    selectTransaction(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  createTransaction: async (req, res) => {
    // post buat nambahin data ke variable
    let {payment_method, users_email, id_product, transaction_date} = req.body;
    const {
      rows: [count],
    } = await countTransaction();
    const id = Number(count.count) + 1;
    const data = {
      id,
      payment_method,
      users_email,
      id_product,
      transaction_date,
    };
    insertTransaction(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Product created'))
      .catch((err) => res.send(err));
  },
  updateTransaction: async (req, res) => {
    // put buat update data variable
    const id = Number(req.params.id);
    let {payment_method, users_email, id_product, transaction_date} = req.body;
    const {rowCount} = await findId(id);
    if (!rowCount) {
      res.json({message: 'ID is Not Found'});
    }
    const data = {
      id,
      payment_method,
      users_email,
      id_product,
      transaction_date,
    };
    updateTransaction(data)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product updated'))
      .catch((err) => res.send(err));
  },
  deleteTransaction: async (req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    deleteTransaction(id)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product deleted'))
      .catch((err) => res.send(err));
  },
};

module.exports = transactionController;

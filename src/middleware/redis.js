const client = require('../config/redis');
const {response} = require('../helper/common');

const hitCacheProductDetail = async (req, res, next) => {
  const idProduct = req.params.id;
  const product = await client.get(`product/${idProduct}`);
  if (product) {
    return response(res, JSON.parse(product), 200, 'get data success from redis');
  }
  next();
};

const clearCacheProductDetail = (req, res, next) => {
  const idProduct = req.params.id;
  client.del(`product/${idProduct}`);
  next();
};

const hitCacheCategoryDetail = async (req, res, next) => {
  const idCategory = req.params.id;
  const product = await client.get(`Category/${idCategory}`);
  if (product) {
    return response(res, JSON.parse(product), 200, 'get data success from redis');
  }
  next();
};

const clearCacheCategoryDetail = (req, res, next) => {
  const idCategory = req.params.id;
  client.del(`Category/${idCategory}`);
  next();
};
module.exports = {hitCacheProductDetail, clearCacheProductDetail, hitCacheCategoryDetail, clearCacheCategoryDetail};

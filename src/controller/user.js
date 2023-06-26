const {createUser, findEmail} = require('../model/user');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authHelper = require('../helper/auth');
const commonHelper = require('../helper/common');

let userController = {
  registerUser: async (req, res) => {
    // post buat nambahin data ke variable
    let {name, email, password, phone_number, gender, birth_date, role} = req.body;
    const {rowCount} = await findEmail(email);
    if (rowCount) {
      return res.json({message: 'Email is already taken'});
    }
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    const data = {
      id,
      name,
      email,
      passwordHash,
      phone_number,
      gender,
      birth_date,
      role,
    };
    // console.log(data);
    createUser(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, 'Account created');
      })
      .catch((err) => {
        res.send(err);
      });
  },
  loginUser: async (req, res) => {
    let {email, password} = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return res.json({message: 'Email is incorrect!'});
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.json({message: 'Password is incorrect!'});
    }
    const payload = {
      email: user.email,
      role: user.role,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);

    commonHelper.response(res, user, 201, 'login is successful');
  },
  profileUser: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 201, 'Token is Already generate');
  },
};
module.exports = userController;

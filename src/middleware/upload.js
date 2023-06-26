const multer = require('multer');
const createError = require('http-errors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: function (req, file, cb) {
    const allowExtension = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.mimetype.split('/')[1];
    console.log(file);
    console.log(fileExtension);
    if (allowExtension.includes(fileExtension)) {
      return cb(null, true);
    } else {
      return cb(new createError(400, 'Input file jpg, jpeg, or png for image'));
    }
  },
});

module.exports = upload;

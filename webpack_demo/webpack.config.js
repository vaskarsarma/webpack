var debug = process.env.NODE_ENV !== "production";
const path = require('path');

module.exports = {
  mode: debug? 'development':'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
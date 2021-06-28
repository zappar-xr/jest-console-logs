const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../umd'),
    filename: 'zappar-mobileonly.js',
    library: 'MobileOnly',
    libraryTarget: 'umd',
  },
  resolve: {
    fallback: {
      fs: false,
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.wasm'],
  },
  plugins: [],
  devServer: {
    contentBase: '../dist',
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /zcv\.wasm$/,
        type: 'javascript/auto',
        loader: 'file-loader',
      },
    ],
  },
};

module.exports = {
  entry: ["babel-polyfill", __dirname + "/src/index.jsx"],
  output: {
    path: __dirname + '/application',
    filename: 'YogWbScoreTools.js'
  },
  devServer: {
    contentBase: 'application', // 監視フォルダ
    port: 9999,
    inline: true,
    open: true,
    historyApiFallback: {
      index: 'YogWbScoreTools.htm'
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: [/node_modules/, /__test__/, /__test_mocks__/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/react'],
              ['@babel/env',
                {
                  "targets": {
                    "ie": 11
                  },
                  "useBuiltIns": "usage",
                  "corejs": 3
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.png$/,
        loaders: 'url-loader'
      }
    ]
  }
};

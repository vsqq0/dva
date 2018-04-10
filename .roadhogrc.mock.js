const url = 'http://localhost:3000/';
// const url = 'https://coin-cms.herokuapp.com/';
export default {
  'get /*': url,
  'post /*': url,
  'put /*': url,
  'delete /*': url
  // proxyTable: {
  //   '/*': {
  //     target: 'http://localhost:3000/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/': '/' }
  //   }
  // }
};

// "plugins": [
//   ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
// ]
// "extraBabelPlugins": [
//   ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
// ]

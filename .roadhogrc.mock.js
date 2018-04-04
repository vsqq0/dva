// const url = 'http://localhost:3000/';
const url = 'https://coin-cms.herokuapp.com/';
export default {
  // '/*': 'https://coin-cms.herokuapp.com/'
  // '/api/*': 'http://www.zjttmall.com/'
  'get /*': url,
  'post /*': url,
  'put /*': url,
  'delete /*': url

  // proxy: {
  //   '/api/*': {
  //     target: 'http://www.zjttmall.com/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '/' }
  //   }
  // }
  // proxy: {
  //   '/api/*': {
  //     target: 'http://localhost:3000/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '/' }
  //   }
  // }
};

// "plugins": [
//   ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
// ]
// "extraBabelPlugins": [
//   ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
// ]

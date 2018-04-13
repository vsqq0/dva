import '@babel/polyfill';
import dva from 'dva';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'antd-mobile/dist/antd-mobile.less';  // or 'antd-mobile/dist/antd-mobile.less'
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/store.js').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

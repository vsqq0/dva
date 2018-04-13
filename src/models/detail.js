import { get } from '../utils/req'; // , post, put, del
// import $ from '../utils/help';

export default {
  namespace: 'detail',

  state: {
    detailId: 0,
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/detail') {
          console.log('do');
          // if (this.state.detailId) {
          //   await this.cateDetailReload();
          // }
          dispatch({
            type: 'cateDetailReload',
            payload: {}
          });
          console.log('done');
        }
      });
    }
  },
  effects: {
    *cateDetailReload({ payload }, { select, call, put }) {
      console.log('doing');
      // var data = yield get(
      //   '/cate_details/' + window.location.href.split('detailId=')[1]
      // );
      yield select(({ detail, store }) => {
        console.log(detail, store, 111);
      });
      // yield put({
      //   type: 'cateDetailReload',
      //   payload: {}
      // });
      // return { ...state, ...data, loading: false };
      // this.setState({
      //   pics: data.data.pics,
      //   data: $.filterNull(data.data.data)
      // });
    },
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    }
  },
  reducers: {
    async cateDetailReload(state) {
      console.log('doing');
      var data = await get(
        '/cate_details/' + window.location.href.split('detailId=')[1]
      );
      return { ...state, ...data, loading: false };
      // this.setState({
      //   pics: data.data.pics,
      //   data: $.filterNull(data.data.data)
      // });
    },
    querySuccess(state) {
      const mock = {
        total: 3,
        current: 1,
        loading: false,
        list: [
          {
            id: 1,
            name: '张三',
            age: 23,
            address: '成都'
          },
          {
            id: 2,
            name: '李四',
            age: 24,
            address: '杭州'
          },
          {
            id: 3,
            name: '王五',
            age: 25,
            address: '上海'
          }
        ]
      };
      console.log('im redux');
      return { ...state, ...mock, loading: false };
    }
  }
};

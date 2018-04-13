export default {
  namespace: 'store',
  state: {
    iddd: 1
  },
  subscriptions: {
    //step 1
    // setup({ dispatch, history }) {
    //   history.listen(location => {
    //     if (location.pathname === '/users') {
    //       dispatch({//goto
    //         type: 'querySuccess',
    //         payload: {}
    //       });
    //     }
    //   });
    // },
  },
  effects: {},
  reducers: {
    querySuccess(state, action) {
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
      return { ...state, ...mock, loading: false }; //goto 合并state
    }
  }
};

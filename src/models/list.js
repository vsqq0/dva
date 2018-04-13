export default {
  namespace: 'example',

  state: {
    list: [],
    total: 0,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create' // 弹出窗的类型（添加用户，编辑用户）
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    }
  },

  reducers: {
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
    },
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};

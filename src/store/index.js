//组合子模块 到处store实例

import { configureStore } from '@reduxjs/toolkit';
import billReducer from './modules/billStore';

const store = configureStore({
  reducer:{
    biil: billReducer
  }
});

export default store;
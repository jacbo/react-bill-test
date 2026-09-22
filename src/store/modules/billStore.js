//账单列表相关store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: 'bill',
    initialState:{
        billList: []
    },
    reducers: {
        setBillList(state,action){
            state.billList = action.payload
        }
    }
})


const {setBillList} = billStore.actions

//编写异步
function getBillList(){
    return async (dispatch)=>{
        //编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        //出发同步reducer
        dispatch(setBillList(res.data))
    }
}

export {getBillList}

const reducer = billStore.reducer

export default reducer
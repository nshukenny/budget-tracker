import { createSlice } from "@reduxjs/toolkit";
import { tranList } from "./Data";


const FILTER_TRANSACTIONS = 'FILTER_TRANSACTIONS';

const tranSlice = createSlice({
  name: "trans",
  initialState: tranList,
  reducers: {
    addTrans: (state, action) => {
      return [action.payload, ...state];
    },
    updateTrans: (state, action) => {
      const { id, title, date, category, amount, description } = action.payload;
      const un = state.find((trans) => trans.id === id);
      if (un) {
        un.title = title;
        un.date = date;
        un.category = category;
        un.amount = amount;
        un.description = description;
      }
    },
    deleteTrans: (state, action) => {
      const { id } = action.payload;
      const un = state.find((trans) => trans.id === id);
      if (un) {
        return state.filter((f) => f.id !== id);
      }
    },
    [FILTER_TRANSACTIONS]: (state, action) => {
        const { searchQuery } = action.payload;
        
        return state.filter((tran) =>
          tran.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tran.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },      
  },
});

export const { addTrans, updateTrans, deleteTrans } = tranSlice.actions;
export default tranSlice.reducer;

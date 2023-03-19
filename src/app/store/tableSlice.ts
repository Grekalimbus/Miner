import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from '.';

export type TableData = {   
    nik: string;
    lvl: string;
    time: string;
    timeNum: number
  
};
interface TableState {
  tableData: TableData[];
}

const initialState: TableState = {
  tableData: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<TableData[]>) => {
      state.tableData = action.payload
    },
    resetTable: (state) => {
      state.tableData = [];
    },
  },
});

export const { addData, resetTable } = tableSlice.actions;

export const selectTableData = (state: RootState): TableData[] =>
  state.table.tableData;

export const loadData = (): ThunkAction<void, RootState, unknown, Action<string>> => (
  dispatch
) => {
  const data = localStorage.getItem('results');
  if (data) {       
      dispatch(addData(JSON.parse(data)));    
  }
};

export default tableSlice.reducer;
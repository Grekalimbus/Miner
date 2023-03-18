import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { RootState } from '.';

type TableData = {
  [key: string]: {
    nik: string;
    lvl: string;
    time: string;
  };
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
    addData: (state, action: PayloadAction<TableData>) => {
      state.tableData.push(action.payload);
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
    const parsedData: TableData[] = JSON.parse(data);
    parsedData.forEach((item) => {
      dispatch(addData(item));
    });
  }
};

export default tableSlice.reducer;
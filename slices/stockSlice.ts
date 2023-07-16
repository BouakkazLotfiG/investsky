import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StockData } from '../types';

const initialState: StockData = {
  symbol: '',
  quote: {
    '01. symbol': '',
    '02. open': '',
    '03. high': '',
    '04. low': '',
    '05. price': '',
    '06. volume': '',
    '07. latest trading day': '',
    '08. previous close': '',
    '09. change': '',
    '10. change percent': '',
  },
  graph: {},
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    selectedStock: (state, action: PayloadAction<StockData>) => {
      state.symbol = action.payload.symbol;
      state.quote = action.payload.quote;
      state.graph = action.payload.graph;
    },
  },
});

export const { selectedStock } = stockSlice.actions;

export default stockSlice.reducer;

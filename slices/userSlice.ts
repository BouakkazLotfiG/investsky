import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockData } from '../types';

const initialState: StockData[] = [];

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<StockData>) => {
      state.push(action.payload);
    },
    removeStock: (state, action: PayloadAction<string>) => {
      return state.filter((stock) => stock.symbol !== action.payload);
    },
  },
});

export const { addStock, removeStock } = portfolioSlice.actions;

export default portfolioSlice.reducer;

import {
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';

interface IExchangeHistory {
	data: string,
	amountFrom: string,
	amountTo: string
}

const initialState: {exchangeHistory: IExchangeHistory[]} = {
	exchangeHistory: []
};

export const exchangeHistorySlice = createSlice({
	name: 'exchangeHistory',
	initialState,
	reducers: {
		add: (state, action:PayloadAction<IExchangeHistory>) => {
			state.exchangeHistory = [...state.exchangeHistory, action.payload];
			return state
		},
		clear: (state) => {
			state = initialState;
			return state;
		}
	}
});

export const {
	add,
	clear
} = exchangeHistorySlice.actions;

export default exchangeHistorySlice.reducer;
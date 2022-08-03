import {
	createSlice,
	PayloadAction
} from '@reduxjs/toolkit';

interface IExchangeHistory {
	date: string,
	amountFrom: {
		amount: number,
		currency: string
	},
	amountTo: {
		amount: number,
		currency: string
	}
}

const initialState: {exchangeHistory: IExchangeHistory[]} = {
	exchangeHistory: []
};

export const exchangeHistorySlice = createSlice({
	name: 'exchangeHistory',
	initialState,
	reducers: {
		add: (state, action:PayloadAction<IExchangeHistory>) => {
			state.exchangeHistory = [action.payload, ...state.exchangeHistory];
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
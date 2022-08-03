import axios, {AxiosError} from 'axios';
import {
	QueryKey,
	useQuery
} from '@tanstack/react-query';
import {useEffect} from 'react';

// hooks
import useErrorMessage from '@hooks/useErrorMessage';

// types
interface IConversionData {
	data: {
		date: string,
		query: {
			amount: number,
			from: string,
			to: string
		},
		result: number
	}
}

const fetchConversion = async (
	queryKey: QueryKey
) => {
	const [, to, from, amount] = queryKey;
	return await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, {
		headers: {'apikey': `${process.env.REACT_APP_APILAYER_KEY}`}
	});
};

const useQueryConversion = (
	to: string,
	from: string,
	amount: string,
	setErrorMessage: (value: string) => void
) => {
	const {data, refetch, error, isError} = useQuery<IConversionData, AxiosError>(['conversions', to, from, amount], ({queryKey}) => fetchConversion(queryKey), {
		enabled: false,
		retry: 0,
		refetchIntervalInBackground: false,
		refetchInterval: false,
		refetchOnWindowFocus: false
	});
	
	const {
		convertStatusToMessage,
	} = useErrorMessage(setErrorMessage);
	
	const getConversion = async () => {
		return await refetch();
	}
	
	useEffect(() => {
		if (error) {
			const status = error.response?.status;
			if (status) {
				convertStatusToMessage(status);
			}
		}
	}, [error]);
	return {
		getConversion,
		isError,
		data
	}
}

export default useQueryConversion;
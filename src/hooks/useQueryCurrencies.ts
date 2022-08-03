import {
	useEffect,
	useState
} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';

// hooks
import useErrorMessage from '@hooks/useErrorMessage';

interface ICurrenciesData {
	data: {
		symbols: {
			[key: string]: string
		}
	}
}

const fetchCurrencies = async () => (
	await axios.get('https://api.apilayer.com/exchangerates_data/symbols', {
		headers: {'apikey': `${process.env.REACT_APP_APILAYER_KEY}`}
	})
);

const useQueryCurrencies = (setErrorMessage: (value: string) => void) => {
	const {
		data,
		isError,
		error
	} = useQuery<ICurrenciesData, AxiosError>(['currencies'], fetchCurrencies, {
		retry: 0,
		refetchIntervalInBackground: false,
		refetchInterval: false,
		refetchOnWindowFocus: false
	});
	
	const {
		convertStatusToMessage,
	} = useErrorMessage(setErrorMessage);
	
	const [currencies, setCurrencies] = useState<string[]>([]);
	
	useEffect(() => {
		if (data && 'symbols' in data.data) {
			setErrorMessage('');
			setCurrencies(Object.keys(data.data.symbols));
		} else if (error) {
			const status = error.response?.status;
			if (status) {
				convertStatusToMessage(status);
			}
		}
	}, [data, error]);
	return {
		currencies,
		isError
	}
}

export default useQueryCurrencies;
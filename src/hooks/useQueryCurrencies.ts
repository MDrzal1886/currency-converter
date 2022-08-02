import {
	useEffect,
	useState
} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import useErrorMessage from '@hooks/useErrorMessage';

const fetchCurrencies = async () => (
	await axios.get('https://api.apilayer.com/exchangerates_data/symbols', {
		headers: {'apikey': `${process.env.REACT_APP_APILAYER_KEY}`}
	})
);

interface ICurrenciesData {
	data: {
		symbols: {
			[key: string]: string
		}
	}
}

const useQueryCurrencies = () => {
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
		errormessage,
		setErrorMessage
	} = useErrorMessage();
	
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
		isError,
		errormessage
	}
}

export default useQueryCurrencies;
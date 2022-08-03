import {
	FC,
	useEffect,
	useMemo,
	useState
} from 'react';
import {
	useLocation,
	useNavigate
} from 'react-router-dom';
import {
	SubmitHandler,
	useForm
} from 'react-hook-form';

// assets
import {ReactComponent as Change} from '@assets/icons/icon-change.svg';

// styles
import styles from './Form.module.scss';

// hooks
import useQueryConversion from '@hooks/useQueryConversion';

// store
import {useAppDispatch} from '@store/hooks';
import {add} from '@store/reducers/exchange-history/exchangeHistorySlice';

// components
import Select from '@design-system/select/Select';
import Input from '@design-system/input/Input';
import Button from '@design-system/button/Button';
import ButtonLink from '@design-system/button-link/ButtonLink';

export interface IFormInputs {
	amount: string,
	result: string
}

type FormProps = {
	currencies: string[],
	setErrorMessage: (value: string) => void,
	setShowAlert: (value: boolean) => void
}

const Form:FC<FormProps> = ({
	currencies,
	setErrorMessage,
	setShowAlert
}) => {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: {
			errors,
			isValid
		}
	} = useForm<IFormInputs>({
		mode: 'onSubmit'
	});
	
	const {
		setErrorMessageMemo,
		setShowAlertMemo
	} = useMemo(() => ({
		setErrorMessageMemo: setErrorMessage,
		setShowAlertMemo: setShowAlert
	}), [setErrorMessage, setShowAlert]);
	
	const dispatch = useAppDispatch();

	const [fromValue, setFromValue] = useState('PLN');
	const [toValue, setToValue] = useState('EUR');
	
	const {
		getConversion,
		isError: conversionError,
		data
	} = useQueryConversion(toValue, fromValue, watch('amount'), setErrorMessageMemo);
	
	const onSubmit:SubmitHandler<IFormInputs> = async () => {
		const {data} = await getConversion();
		
		if (data) {
			const {
				date,
				result,
				query
			} = data.data;
			dispatch(add({
				date: date,
				amountTo: {amount: Number(result.toFixed(2)), currency: query.to},
				amountFrom: {amount: query.amount, currency: query.from}
			}));
			navigate('/historia');
		}
	};

	const handleChangeValues = () => {
		setFromValue(toValue);
		setToValue(fromValue);
	}
	
	useEffect(() => {
		if (conversionError) {
			setShowAlertMemo(true);
		}
	}, [conversionError, setShowAlertMemo]);
	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<div className={styles.selects_wrapper}>
				<div className={styles.select}>
					<Select
						label="Przelicz z"
						options={currencies.filter(currency => currency !== toValue)}
						value={fromValue}
						onChange={setFromValue}
					/>
				</div>
				<div
					className={styles.change_icon_wrapper}
					onClick={handleChangeValues}
				>
					<Change />
				</div>
				<div className={styles.select}>
					<Select
						label="Przelicz na"
						options={currencies.filter(currency => currency !== fromValue)}
						value={toValue}
						onChange={setToValue}
					/>
				</div>
			</div>
			<div className={styles.inputs_wrapper}>
				<div className={styles.input}>
					<Input
						name="amount"
						label="Kwota"
						placeholder="Wpisz kwotę"
						handleOnChange={setValue}
						currency={fromValue}
						result={false}
						register={register}
						validation={{
							required: true,
							min: 1,
							valueAsNumber: true
						}}
						error={'amount' in errors}
						errorMessage="Nieprawidłowa wartość"
					/>
				</div>
				<div className={styles.input}>
					<Input
						name="result"
						label="Wynik"
						placeholder="Wynik"
						value={data?.data.result.toFixed(2)}
						currency={toValue}
						result={true}
					/>
				</div>
			</div>
			<div className={styles.buttons_wrapper}>
				<div className={styles.button}>
					<ButtonLink
						name={pathname === '/historia' ? 'Ukryj historię' : 'historia'}
						path={pathname === '/historia' ? '/' : 'historia'}
					/>
				</div>
				<div className={styles.button}>
					<Button
						name="Konwertuj"
						type="submit"
						disabled={!isValid}
					/>
				</div>
			</div>
		</form>
	);
}

export default Form;
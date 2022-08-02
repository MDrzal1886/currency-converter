import {useState} from 'react';
import {
	useLocation,
	useNavigate
} from 'react-router-dom';
import {
	FieldValues,
	SubmitHandler,
	useForm
} from 'react-hook-form';

// assets
import {ReactComponent as Change} from '@assets/icons/icon-change.svg';

// components
import Select from '@design-system/select/Select';
import Input from '@design-system/input/Input';
import Button from '@design-system/button/Button';
import ButtonLink from '@design-system/button-link/ButtonLink';

export interface IFormInputs {
	amount: string,
	result: string
}

const Form = () => {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		formState: {
			errors,
			isValid
		}
	} = useForm<IFormInputs>({
		mode: 'onSubmit'
	});

	const [fromValue, setFromValue] = useState('PLN');
	const [toValue, setToValue] = useState('EUR');
	
	const onSubmit:SubmitHandler<IFormInputs> = (data) => {
		
		navigate('/historia');
	};

	const handleChangeValues = () => {
		setFromValue(toValue);
		setToValue(fromValue);
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Select
				label="Przelicz z"
				options={['PLN', 'EUR', 'USD']}
				value={fromValue}
				onChange={setFromValue}
			/>
			<div onClick={handleChangeValues}>
				<Change />
			</div>
			<Select
				label="Przelicz na"
				options={['PLN', 'EUR', 'USD']}
				value={toValue}
				onChange={setToValue}
			/>
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
			<Input
				name="result"
				label="Wynik"
				placeholder="Wynik"
				value="4325"
				currency={toValue}
				result={true}
			/>
			<ButtonLink
				name={pathname === '/historia' ? 'Ukryj historię' : 'historia'}
				path="/historia"
			/>
			<Button
				name="Konwertuj"
				type="submit"
				disabled={!isValid}
			/>
		</form>
	);
}

export default Form;
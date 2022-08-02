import {FC} from 'react';

// styles
import styles from './Input.module.scss';
import {FieldValues, RegisterOptions, UseFormRegister, UseFormSetValue} from 'react-hook-form';
import {IFormInputs} from '@components/form/Form';

type InputProps = {
	name: 'result' | 'amount',
	label: string,
	placeholder: string,
	value?: string,
	handleOnChange?:  UseFormSetValue<IFormInputs>,
	currency: string,
	result: boolean,
	register?: UseFormRegister<IFormInputs>,
	validation?:  RegisterOptions,
	error?: boolean,
	errorMessage?: string,
}

const Input:FC<InputProps> = ({
	name,
	label,
	placeholder,
	value,
	handleOnChange,
	currency,
	result,
	register,
	validation,
	error,
	errorMessage
}) => {
	return (
		<label className={styles.label_container}>
			<span className={styles.label}>
				{label}
			</span>
			<input
				className={`${styles.input} ${result ? styles.result : ''} ${error ? styles.error : ''}`}
				{...register && register(name, validation)}
				type="number"
				placeholder={placeholder}
				defaultValue={value}
				disabled={result}
				onChange={(e) => {
					handleOnChange && handleOnChange(name, e.target.value, {shouldValidate: true})
				}}
			/>
			<span className={`${styles.currency} ${error ? styles.error : ''}`}>
				{currency}
			</span>
			<span className={styles.error_message}>
				{error && errorMessage}
			</span>
		</label>
	);
}

export default Input;
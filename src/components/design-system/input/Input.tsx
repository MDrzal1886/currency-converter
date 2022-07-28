import {FC} from 'react';

// styles
import styles from './Input.module.scss';

type InputProps = {
	label: string,
	placeholder: string,
	value: string,
	onChange: () => void,
	currency: string,
	result: boolean,
	error: boolean,
	errorMessage?: string,
}

const Input:FC<InputProps> = ({
	label,
	placeholder,
	value,
	onChange,
	currency,
	result,
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
				type="number"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
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
import {FC} from 'react';

// styles
import styles from './Button.module.scss';

type ButtonProps = {
	name: string,
	onClick: () => void,
	disabled: boolean
}

const Button:FC<ButtonProps> = ({
	name,
	onClick,
	disabled
}) => {
	return (
		<button
			className={`${styles.button} ${disabled ? styles.disabled : styles.active}`}
			onClick={onClick}
			disabled={disabled}
		>
			{name}
		</button>
	);
}

export default Button;
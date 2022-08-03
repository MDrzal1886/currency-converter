import {FC} from 'react';

// styles
import styles from './Button.module.scss';

type ButtonProps = {
	name: string,
	onClick?: () => void,
	type: 'button' | 'submit' | 'reset',
	disabled: boolean
}

const Button:FC<ButtonProps> = ({
	name,
	onClick,
	type,
	disabled
}) => (
	<button
		className={`${styles.button} ${disabled ? styles.disabled : styles.active}`}
		type={type}
		onClick={onClick}
	>
		{name}
	</button>
);

export default Button;
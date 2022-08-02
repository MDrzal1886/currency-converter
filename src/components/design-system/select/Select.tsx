import {
	FC,
	useRef,
	useState
} from 'react';

// assets
import {ReactComponent as ArrowDown} from '@assets/icons/icon-down.svg';
import {ReactComponent as ArrowUp} from '@assets/icons/icon-up.svg';

// styles
import styles from './Select.module.scss';

// hooks
import useOutsideClick from '@hooks/useClickOutside';

type SelectProps = {
	label: string,
	options: string[],
	value: string,
	onChange: (value: string) => void
}

const Select:FC<SelectProps> = ({
	label,
	value,
	options,
	onChange
}) => {
	const selectRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);
	
	useOutsideClick(selectRef, setActive);
	return (
		<div className={styles.container}>
			<span className={styles.label}>
				{label}
			</span>
			{active ?
				<ArrowUp />
				:
				<ArrowDown />
			}
			<div
				className={`${styles.select} ${active ? styles.active : styles.default}`}
				onClick={() => setActive(prev => !prev)}
				ref={selectRef}
			>
				{value}
				{active &&
					<div className={styles.options_container}>
						{options.map((option, index) => (
							<div
								className={styles.single_option}
								onClick={() => onChange(option)}
								key={index}
							>
								{option}
							</div>
						))}
					</div>
				}
			</div>
		</div>
	);
}

export default Select;
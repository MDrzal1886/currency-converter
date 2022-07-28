import {FC} from 'react';

// assets
import {ReactComponent as Close} from '@assets/icons/icon-close.svg';

// styles
import styles from './Alert.module.scss';

type AlertProps = {
	message: string,
	handleClose: () => void
}

const Alert:FC<AlertProps> = ({
	message,
	handleClose
}) => {
	return (
		<div className={styles.background}>
			<div className={styles.alert_modal}>
				<p className={styles.title}>Error message</p>
				<p className={styles.message}>{message}</p>
				<div
					className={styles.close}
					onClick={handleClose}
				>
					<Close />
				</div>
			</div>
		</div>
	);
}

export default Alert;
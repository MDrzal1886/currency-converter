import {
	FC,
	useEffect,
	useState
} from 'react';

// styles
import styles from './ContentContainer.module.scss';

// hooks
import useQueryCurrencies from '@hooks/useQueryCurrencies';

// components
import Form from '@components/form/Form';
import Alert from '@design-system/alert/Alert';

const ContentContainer = () => {
	const {
		currencies,
		isError: currenciesError,
		errormessage
	} = useQueryCurrencies();
	
	const [alertShow, setAlertShow] = useState(false);
	
	useEffect(() => {
		if (currenciesError) {
			setAlertShow(true);
		}
	}, [currenciesError]);
	return (
		<div>
			<div className={styles.content_container}>
				<h1 className={styles.title}>Konwerter walut</h1>
				<Form />
			</div>
			{alertShow &&
				<Alert
					message={errormessage}
					handleClose={() => setAlertShow(false)}
				/>
			}
		</div>
	);
}

export default ContentContainer;
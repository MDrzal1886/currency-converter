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
import ExchangeHistory from '@components/exchange-history/ExchangeHistory';
import ButtonLink from '@design-system/button-link/ButtonLink';

type ContentContainerProps = {
	isHistory?: boolean,
	isError?: boolean
}

const ContentContainer:FC<ContentContainerProps> = ({
	isHistory,
	isError
}) => {
	const [errormessage, setErrorMessage] = useState('');
	const [alertShow, setAlertShow] = useState(false);
	
	const {
		currencies,
		isError: currenciesError
	} = useQueryCurrencies(setErrorMessage);
	
	
	useEffect(() => {
		if (currenciesError) {
			setAlertShow(true);
		}
	}, [currenciesError]);
	return (
		<div className={styles.wrapper}>
				{!isError ?
					<>
						<div className={styles.content_wrapper}>
							<h1 className={styles.title}>Konwerter walut</h1>
								<Form
									currencies={currencies}
									setErrorMessage={setErrorMessage}
									setShowAlert={setAlertShow}
								/>
								{isHistory &&
									<ExchangeHistory />
								}
						</div>
						{alertShow &&
							<Alert
								message={errormessage}
								handleClose={() => {
									setAlertShow(false);
									setErrorMessage('');
								}}
							/>
						}
					</>
					:
					<div className={styles.error_page_wrapper}>
						<h1>
							<p>404</p>
							Strona nie znaleziona
						</h1>
						<div className={styles.button_wrapper}>
							<ButtonLink
								name="Wróć na stronę główną"
								path="/"
							/>
						</div>
					</div>
				}
		</div>
	);
}

export default ContentContainer;
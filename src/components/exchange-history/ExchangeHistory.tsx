import {
	useLayoutEffect,
	useState
} from 'react';
import {useNavigate} from 'react-router-dom';

// assets
import {ReactComponent as ArrowRight} from '@assets/icons/icon-arrow-right.svg';

// styles
import styles from './ExchangeHistory.module.scss';

// store
import {
	useAppDispatch,
	useAppSelector
} from '@store/hooks';
import {clear} from '@store/reducers/exchange-history/exchangeHistorySlice';

// components
import Button from '@design-system/button/Button';

const ExchangeHistory = () => {
	const navigate = useNavigate();
	const {exchangeHistory} = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const [width, setWidth] = useState(window.innerWidth);
	
	useLayoutEffect(() => {
		window.addEventListener('resize', () => setWidth(window.innerWidth));
		return () => {
			window.removeEventListener('resize', () => setWidth(window.innerWidth));
		}
	}, []);
	return (
		<div className={styles.history_wrapper}>
			{exchangeHistory.length > 0 &&
				<>
					<div className={styles.header}>
						<p className={styles.column_data}>Data</p>
						<p className={styles.column_from}>{width < 550 ? 'Przed' : 'Przed konwersją'}</p>
						<div className={styles.arrow_right_wrapper}/>
						<p className={styles.column_to}>{width < 550 ? 'Po' : 'Po konwersji'}</p>
					</div>
					<div className={styles.history_scroll_wrapper}>
						{exchangeHistory.map((item, index) => (
							<div
								className={styles.single_item}
								key={index}
							>
								<p className={styles.data}>{item.date}</p>
								<p className={styles.from}>
									{item.amountFrom.amount}
									<span> {item.amountFrom.currency}</span>
								</p>
								<div className={styles.arrow_right_wrapper}>
									<ArrowRight />
								</div>
								<p className={styles.to}>
									{item.amountTo.amount}
									<span> {item.amountTo.currency}</span>
								</p>
							</div>
						))}
					</div>
					<div className={styles.button_wrapper}>
						<Button
							name="Usuń historię"
							type="button"
							onClick={() => {
								dispatch(clear());
								navigate('/');
							}}
							disabled={false}
						/>
					</div>
				</>
			}
		</div>
	);
}

export default ExchangeHistory;
import {FC} from 'react';

// styles
import styles from './ContentContainer.module.scss';

// components
import Button from '@design-system/button/Button';
import ButtonLink from '@design-system/button-link/ButtonLink';
import Select from '@design-system/select/Select';
import Input from '@design-system/input/Input';
import Alert from '@design-system/alert/Alert';

type ContentContainerProps = {
	name: string,
}

const ContentContainer:FC<ContentContainerProps> = ({name}) => {
	return (
		<div>
			<div className={styles.content_container}>
				{name}
				<div style={{width: '167px'}}>
					<Button
						name="Konwertuj"
						disabled={false}
						onClick={() => {}}
					/>
				</div>
				<div style={{width: '147px'}}>
					<ButtonLink
						name="Historia"
						path="/historia"
					/>
				</div>
				<div style={{width: '220px'}}>
					<Input
						label="Kwota"
						placeholder="Wpisz kwotę"
						value=""
						onChange={() => {}}
						currency="PLN"
						result={false}
						error={false}
						errorMessage="Nieprawidłowa wartość"
					/>
				</div>
				<div style={{width: '150px'}}>
					<Select
						label="From"
						value="PLN"
						onChange={() => {}}
						options={['PLN', 'USD', 'EUR', 'SDF', 'SDF', 'GFD', 'FGY']}
					/>
				</div>
			</div>
			{false &&
				<Alert
					message="Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem."
					handleClose={() => {}}
				/>
			}
		</div>
	);
}

export default ContentContainer;
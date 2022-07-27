import {FC} from 'react';

// styles
import styles from './ContentContainer.module.scss';

type ContentContainerProps = {
	name: string,
}

const ContentContainer:FC<ContentContainerProps> = ({name}) => {
	return (
		<div className={styles.content_container}>
			{name}
		</div>
	);
}

export default ContentContainer;
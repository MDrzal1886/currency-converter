import {FC} from 'react';
import {Link} from 'react-router-dom';

// styles
import styles from './ButtonLink.module.scss';

type ButtonLinkProps = {
	name: string,
	path: string;
}

const ButtonLink:FC<ButtonLinkProps> = ({
	name,
	path
}) => {
	return (
		<Link
			className={styles.button_link}
			to={path}
		>
			{name}
		</Link>
	);
}

export default ButtonLink;
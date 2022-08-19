import {
	Component,
	ErrorInfo,
	ReactNode
} from 'react';

// styles
import styles from './ErrorBoundary.module.scss';

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean,
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	};
	
	public static getDerivedStateFromError(_: Error): State {
		return {hasError: true};
	};
	
	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	};
	
	public render() {
		if (this.state.hasError) {
			return (
				<div className={styles.error_wrapper}>
					<h1 className={styles.error_title}>Przepraszamy, wystąpił błąd</h1>
				</div>
			);
		}
		
		return this.props.children;
	};
}

export default ErrorBoundary;
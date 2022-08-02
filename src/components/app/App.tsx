import React from 'react';
import {
	Route,
	Routes
} from 'react-router-dom';

// styles
import styles from './App.module.scss';

// components
import ContentContainer from '@components/content-container/ContentContainer';

const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={<ContentContainer />}
				/>
				<Route
					path="/historia"
					element={<ContentContainer />}
				/>
				<Route
					path="/*"
					element={<ContentContainer />}
				/>
			</Routes>
		</div>
	);
}

export default App;

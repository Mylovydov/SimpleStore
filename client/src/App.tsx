import { observer } from 'mobx-react-lite';
import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

const App = observer(() => {
	return (
		<BrowserRouter>
			<StrictMode>
				<AppRouter/>
			</StrictMode>
		</BrowserRouter>
	);
});

export default App;
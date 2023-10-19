import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
import { Provider } from 'react-redux';
import './index.css';
import { ModalProvider, Modal } from "./context/Modal";


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	window.store = store;
	window.sessionActions = sessionActions;
}

function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);

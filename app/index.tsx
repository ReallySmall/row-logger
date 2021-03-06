import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../ui/scss/main.scss';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers';
import { appConfig } from './config';

const appRootElement = document.getElementById('app');
const store = configureStore();
const history = createBrowserHistory();

(window as any).appInit = () => {

	// create a global config object for the app (convenient but don't over-use)
	// currently just used to set the contxt of the api route
	window[appConfig.windowGlobalAppConfig] = {};

	ReactDOM.render(
		<>
			<CssBaseline />
		    <Provider store={store}>
	    	    <MuiThemeProvider theme={theme}>
		        	<Router>
		            	<Route component={App} />
		        	</Router>
		      	</MuiThemeProvider>
		    </Provider>
	    </>,
	    appRootElement
	);

};

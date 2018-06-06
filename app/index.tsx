import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers';
import { appConfig } from './config';

const appRootElement = document.getElementById('root');
const store = configureStore();
const history = createBrowserHistory();

// create a global config object for the app (convenient but don't over-use)
// currently just used to set the contxt of the api route
window[appConfig.windowGlobalAppConfig] = {};
// get the csrf token from the page
window[appConfig.windowGlobalAppConfig][appConfig.csrf] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

ReactDOM.render(
	<div>
		<CssBaseline />
	    <MuiThemeProvider theme={theme}>
		    <Provider store={store}>
		        <Router history={history}>
		            <Route component={App} />
		        </Router>
		    </Provider>
	    </MuiThemeProvider>
    </div>,
    appRootElement
);

import * as actionConstants from '../../constants/actions';
import { logInRequestComplete, logOutRequestComplete } from '../../actions/auth';

const createMiddleware = () => {

  	return (store: any) => (next: Function) => (action: ReduxAction) => {

        const { getState, dispatch } = store;

        const state: RootState = getState();

  		const actionHandlers: any = {

    	    [actionConstants.LOGIN_REQUEST] (action: ReduxAction): any {

		        window.gapi.load('auth2', () => {

		            window.googleAuth = window.gapi.auth2.init({
		                client_id: '979270325926-cgt0rmaildrg2jopodakv5assj504dng'
		            }).then((auth) => {

						const isLoggedIn: boolean = auth.currentUser.get().isSignedIn();

						dispatch(logInRequestComplete('cheese', 'token', undefined));

		            }, (error) => {

		                console.log(error);

		            });

		        });

			},

			[actionConstants.LOGOUT_REQUEST] (action: ReduxAction): any {

				const authInstance: any = window.gapi.auth2.getAuthInstance();

				authInstance
					.signOut()
					.then(() => {

						console.log(123);
						dispatch(logOutRequestComplete());

					});

				authInstance.disconnect();

			}

		};

    	const { type } = action;
    	const actionHandler = actionHandlers[type];

    	next(action);

    	actionHandler && actionHandler(action);

	};

};

export default createMiddleware();

import * as actionConstants from '../../constants/actions';
import { logInRequestComplete, logOutRequestComplete } from '../../actions/auth';

const createMiddleware = () => {

  	return (store: any) => (next: Function) => (action: ReduxAction) => {

        const { getState, dispatch } = store;

        const state: any = getState();

  		const actionHandlers: any = {

    	    [actionConstants.LOGIN_REQUEST] (action: ReduxAction): any {

		        (window as any).gapi.load('auth2', () => {

		            (window as any).googleAuth = (window as any).gapi.auth2.init({
		                client_id: '979270325926-cgt0rmaildrg2jopodakv5assj504dng'
		            }).then((auth) => {

						const isLoggedIn: boolean = auth.currentUser.get().isSignedIn();

						console.log(isLoggedIn);

						if(isLoggedIn){

							dispatch(logInRequestComplete({
								userName: 'Me',
								token: 'token'
							}, undefined));

						} else {

							dispatch(logInRequestComplete(undefined, undefined));

						}

		            }, (error) => {

						dispatch(logInRequestComplete(undefined, error));

		            });

		        });

			},

			[actionConstants.LOGOUT_REQUEST] (action: ReduxAction): any {

				const authInstance: any = (window as any).gapi.auth2.getAuthInstance();

				authInstance
					.signOut()
					.then(() => {

						authInstance.disconnect();
						dispatch(logOutRequestComplete());

					});

			}

		};

    	const { type } = action;
    	const actionHandler = actionHandlers[type];

    	next(action);

    	actionHandler && actionHandler(action);

	};

};

export default createMiddleware();

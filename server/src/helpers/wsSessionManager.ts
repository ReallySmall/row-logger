import { RowingData } from '../models/RowingData';
import * as EventEmitter from 'events';
import * as wsHelpers from '../helpers/wsHelper';
import * as actions from '../constants/actions';

export class WSSessionManager extends EventEmitter {

	user: string = undefined;
  clients: any = undefined;
  dataSet: any = undefined;
  saveDataSetTimeOut: any = undefined;
  saveDataSetTimeOutMillis: number = 15000;

  	constructor(user: string){

  		super();

      this.user = user;
  		this.clients = {};

  		this.hasClients = this.hasClients.bind(this);
  		this.addClient = this.addClient.bind(this);
  		this.removeClient = this.removeClient.bind(this);
  		this.broadcastLoggerConnectionState = this.broadcastLoggerConnectionState.bind(this);
  		this.broadcastData = this.broadcastData.bind(this);
      this.getSessionTimes = this.getSessionTimes.bind(this);
      this.cancelSaveTimeOut = this.cancelSaveTimeOut.bind(this);
      this.saveDataSet = this.saveDataSet.bind(this);
      this.addToDataSet = this.addToDataSet.bind(this);
      this.clearDataSet = this.clearDataSet.bind(this);

  	}

	public hasClients(): boolean {

		return Object.keys(this.clients).length > 0;

	}

	public addClient(clientToAdd: WebSocketClient): void {

		const connectionId: UUID = clientToAdd.connectionId;

		// add the new client to the client list
		this.clients[connectionId] = clientToAdd;

    console.log(`Client added`);

	}

	public removeClient(clientToRemove: WebSocketClient): void {

		const clientToRemoveConnectionId: UUID = clientToRemove.connectionId;

    // delete from the cache
    if(this.clients[clientToRemoveConnectionId]){

    	delete this.clients[clientToRemoveConnectionId];

      console.log(`Client removed`);

    }

	}

	public broadcastLoggerConnectionState(): void {

	  let loggerIsConnected: boolean = false;

	  // emit event and return if there are now no clients remaining
    if(!this.hasClients()){

  		this.emit(actions.NO_WEBSOCKET_CLIENTS);

  		return;

  	}

		Object.keys(this.clients).forEach((clientId: UUID) => {

    	const client: WebSocketClient = this.clients[clientId];

			if(client.isLogger){

  			loggerIsConnected = true;

  		}

  	});

  	Object.keys(this.clients).forEach((clientId: UUID) => {

    	const client: WebSocketClient = this.clients[clientId];

    	if(client.readyState === 1){

      	client.send(wsHelpers.createWsMessage(loggerIsConnected
      		? actions.WEBSOCKET_LOGGER_CONNECTED
      		: actions.WEBSOCKET_LOGGER_DISCONNECTED, 'Logger connection status updated', false), error => wsHelpers.handleWsError(error));

      	console.log(loggerIsConnected
      		? actions.WEBSOCKET_LOGGER_CONNECTED
      		: actions.WEBSOCKET_LOGGER_DISCONNECTED);

      }

    });

    console.log(`User session contains ${Object.keys(this.clients).length} active clients`);

	}

	public broadcastData(message: any, originatingClient?: WebSocketClient): void {

		Object.keys(this.clients).forEach((clientId: UUID) => {

    	const client: WebSocketClient = this.clients[clientId];

    	if((!originatingClient || originatingClient.connectionId !== client.connectionId) && client.readyState === 1){

    	   client.send(wsHelpers.createWsMessage(actions.WEBSOCKET_MESSAGE, message, false), error => wsHelpers.handleWsError(error));

    	}

    });

	}

  public createDataSet(machineId: string, damping: any, multi: number, times: Array<number>): void {

    this.dataSet = {
      user: this.user,
      machineId: machineId,
      damping: damping,
      multi: multi,
      times: times,
    };

    console.log('session created:', this.dataSet);

  }

  public addToDataSet(data: Array<number>): void {

    this.dataSet.times = [...this.dataSet.times, ...data];

  }

  public clearDataSet(): void {

    this.dataSet = undefined;

  }

  public getSessionTimes(): Array<number> {

    return this.dataSet.times;

  }

  public cancelSaveTimeOut(): void {

    clearTimeout(this.saveDataSetTimeOut);

  }

  public saveDataSet(): void {

      this.cancelSaveTimeOut();

      this.saveDataSetTimeOut = setTimeout(() => {

        const rowingData = new RowingData(this.dataSet);

        rowingData
          .save()
          .then(item => {

            console.log('data saved');
            this.cancelSaveTimeOut();
            this.clearDataSet();

          })
          .catch(error => error && console.log('unable to save data:', error));

      }, this.saveDataSetTimeOutMillis);

    }

}

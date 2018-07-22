import { RowingData } from '../models/RowingData';

export class RowingDataRecorder {

	sessions: any = {};
  timeOutMillis: number = 10000;

  constructor(){

    this.sessionExists = this.sessionExists.bind(this);
    this.createSession = this.createSession.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.addDataToSession = this.addDataToSession.bind(this);
    this.getSessionTimes = this.getSessionTimes.bind(this);
    this.timeOutThenSave = this.timeOutThenSave.bind(this);
    this.cancelSaveTimeOut = this.cancelSaveTimeOut.bind(this);

  }

  public sessionExists(sessionId: UUID): boolean {

  	return this.sessions[sessionId] ? true : false;

  }

  public createSession(sessionId: UUID, user: any, machineId: string, damping: any, multi: number, times: Array<number>): void {

  	if(sessionId && !this.sessions[sessionId]){

  		this.sessions[sessionId] = {
			  timeOut: undefined,
  		};

	  	this.sessions[sessionId] = {
  			user: user,
  			machineId: machineId,
  			damping: damping,
  			multi: multi,
  			times: times,
	  	};

  	}

  }

  public deleteSession(sessionId: UUID){

  	if(sessionId && this.sessions[sessionId]){

      delete this.sessions[sessionId];

    }

  }

  public addDataToSession(sessionId: UUID, data: Array<number>): void {

  	if(sessionId && this.sessions[sessionId]){

      this.sessions[sessionId].times = [...this.sessions[sessionId].times, ...data];

    }

  }

  public getSessionTimes(sessionId: UUID): Array<number> {

  	if(sessionId && this.sessions[sessionId]){

      return this.sessions[sessionId].times;

    }

    return [];

  }

  public cancelSaveTimeOut(sessionId: UUID): void {

  	if(sessionId && this.sessions[sessionId]){

    	clearTimeout(this.sessions[sessionId].timeOut);

    }

  }

  public timeOutThenSave(sessionId: UUID): void {

  	if(sessionId && this.sessions[sessionId]){

	    this.sessions[sessionId].timeOut = setTimeout(() => {

	      const rowingData = new RowingData(this.sessions[sessionId].data);

	      rowingData
	        .save()
	        .then(item => {
	          console.log('data saved');
	        })
	        .catch(error => error && console.log('unable to save data:', error));

	    }, this.timeOutMillis);

	  }

  }

}
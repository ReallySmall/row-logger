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

  sessionExists(key: string){

  	return this.sessions[key] ? true : false;

  }

  createSession(key: string, user: any, machineId: string, damping: any, multi: number, times: Array<number>){

  	if(key && !this.sessions[key]){

  		this.sessions[key] = {
			timeOut: undefined,
  		};

	  	this.sessions[key].data = {
			user: user,
			machineId: machineId,
			damping: damping,
			multi: multi,
			times: times,
	  	};

  	}

  }

  deleteSession(key: string){

  	if(key && this.sessions[key]){
  		delete this.sessions[key];
  	}

  }

  addDataToSession(key: string, data: Array<number>){

  	if(key && this.sessions[key]){
    	this.sessions[key].times = [...this.sessions[key].times, ...data];
    }

  }

  getSessionTimes(key: string){

  	if(key && this.sessions[key]){
    	return this.sessions[key].times;
    }

  }

  cancelSaveTimeOut(key: string){

  	if(key && this.sessions[key]){
    	clearTimeout(this.sessions[key].timeOut);
	  }

  }

  timeOutThenSave(key: string){

  	if(key && this.sessions[key]){

	    this.sessions[key].timeOut = setTimeout(() => {

	      const rowingData = new RowingData(this.sessions[key].data);

	      rowingData
	        .save()
	        .then(item => {
	          console.log('data saved');
	          //updateRowingTotals(rowingData.user, 10);
	        })
	        .catch(error => error && console.log('unable to save data:', error));

	    }, this.timeOutMillis);

	  }

  }

}
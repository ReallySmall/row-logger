declare interface ActiveInterface {
    readonly appConnected: boolean;
    readonly loggerConnected: boolean;
    readonly times: Array<number>;
  	readonly sessionId: string;
    readonly constant: number;
    readonly multi: number;
}

export default ActiveInterface;
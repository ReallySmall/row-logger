declare interface SessionInterface {
    readonly processing: string;
    readonly data: object;
    readonly error: string;
}

export default SessionInterface;
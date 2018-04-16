declare interface AuthInterface {
    readonly processing: string;
    readonly error: string;
    readonly isLoggedIn: boolean;
    readonly roles: Array<string>;
}

export default AuthInterface;
declare interface AuthInterface {
    readonly isLoggedIn: boolean;
    readonly roles: Array<string>;
}

export default AuthInterface;
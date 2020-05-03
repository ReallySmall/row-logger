declare interface AuthInterface {
    readonly isLoggedIn: boolean;
    readonly userName: string;
    readonly token: string;
}

export default AuthInterface;
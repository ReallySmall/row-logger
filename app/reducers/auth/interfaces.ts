declare interface AuthInterface {
    readonly isLoggedIn: boolean;
    readonly userName: string;
    readonly email: string;
    readonly rowerType: string;
    readonly rowerDamping: string;
}

export default AuthInterface;
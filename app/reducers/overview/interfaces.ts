declare interface DashboardOverviewInterface {
    readonly recentSessions: GridData;
    readonly totals: GridData;
    readonly processing: string;
    readonly error: string;
}

export default DashboardOverviewInterface;
export type LogsArray = {
    logs: Log[];
    filterBy : string;
}

export type Log = {
    id: string;
    ref: string;
    direction: string;
    status: string;
    timeStamp: Date;
    element: string;
    intent?: string;
    position?: string;
}
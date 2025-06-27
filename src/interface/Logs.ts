export type LogsArray = {
    logs: Log[];
    filterBy : string;
}

export type Log = {
    id: string;
    ref: string;
    direction: string;
    status: string;
    timeStamp: string;
    element: string;
    intent?: string;
    position?: string;
}


export interface BaseAction<A,T> {
    type:A;
    payload:T;
}
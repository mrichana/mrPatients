export interface Adapter<T> {
    import(item: any): T;
    export(item: T): any;
}

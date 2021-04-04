export interface ICookieManager {
    get(name: string): any
    getAll(): any
    set(name: string, value: string, day: number): any
}

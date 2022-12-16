const consoleStub: Console = {
    Console: console.Console, assert(_value?: any, ..._message: (any)[]): void {
    }, clear(): void {
    }, count(_label?: string): void {
    }, countReset(_label?: string): void {
    }, debug(..._data: (any)[]): void {
    }, dir(_item?: any, _options?: any): void {
    }, dirxml(..._data: any[]): void {
    }, error(..._message: (any)[]): void {
    }, group(..._label: any[]): void {
    }, groupCollapsed(..._data: any[]): void {
    }, groupEnd(): void {
    }, info(..._message: (any)[]): void {
    }, log(..._message: (any)[]): void {
    }, profile(_label?: string): void {
    }, profileEnd(_label?: string): void {
    }, table(_tabularData?: any, _properties?: string[] | ReadonlyArray<string>): void {
    }, time(_label?: string): void {
    }, timeEnd(_label?: string): void {
    }, timeLog(_label?: string, ..._data: any[]): void {
    }, timeStamp(_label?: string): void {
    }, trace(..._message: (any)[]): void {
    }, warn(..._data: (any)[]): void {
    }
}
// const MODE = process.env.NODE_ENV;
const MODE = 'production'
export const proxyConsole: Console = MODE === 'production' ? consoleStub : console;
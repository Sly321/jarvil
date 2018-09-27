/**
 * a central logger
 *
 * @export
 * @class Logger
 */
export default class Logger {

    public static info(...messages: Array<string>): void {
        console.info(...messages)
    }
    public static log(msg: string) {
        console.log(msg)
    }
}
/**
 * a central logger
 *
 * @export
 * @class Logger
 */
export default class Logger {

    public static info(...messages: Array<string>): void {
        console.info("[INFO]", Logger.timeStamp, ...messages)
    }

    public static log(msg: string) {
        console.log(msg)
    }

    public static warn(...messages: Array<string>): void {
        console.warn("[WARN]", `[${Logger.timeStamp}]`, ...messages)
    }

    public static error(...messages: Array<string>): void {
        console.error("[ERROR]", `[${Logger.timeStamp}]`, ...messages)
    }

    private static get timeStamp(): string {
        return new Date().toLocaleDateString()
    }
}
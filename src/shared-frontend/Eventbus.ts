export default class Eventbus {
    public sendAsync(event: string, ...args: Array<any>): void {
        this.ipcRenderer.send(event, ...args)
    }

    public sendSync(event: string, ...args: Array<any>): any {
        return this.ipcRenderer.sendSync(event, ...args)
    }

    public on(event: string, listener: (...args: Array<any>) => void): any {
        return this.ipcRenderer.on(event, (...args: Array<any>) => {
            console.debug(`listening!!!`)
            listener(args)
        })
    }

    private get ipcRenderer() {
        return (window as any).ipcRenderer
    }
}
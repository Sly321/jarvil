export default class Eventbus {
    public sendAsync(event: string, ...args: Array<any>): void {
        this.ipcRenderer.send(event, ...args)
    }

    public sendSync(event: string, ...args: Array<any>): any {
        return this.ipcRenderer.sendSync(event, ...args)
    }

    private get ipcRenderer() {
        return (window as any).ipcRenderer
    }
}
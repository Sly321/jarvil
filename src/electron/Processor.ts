import JarvilPlugin from "./plugins/JarvilPlugin"

export interface ResultItem {
    title: string
    description: string
}

export default class Processor {
    constructor(private plugins: Array<JarvilPlugin>) { }

    public getResultItems(input: string): Array<ResultItem> {
        const result: Array<ResultItem> = []

        if (this.plugins.length === 1) {
            result.push(...this.plugins[0].getResultItems(input))
        }

        return result
    }
}
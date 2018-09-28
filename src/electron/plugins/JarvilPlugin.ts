import { ResultItem } from "../Processor"

export default class JarvilPlugin {
    /**
     * the unique plugin name
     *
     * @type {string}
     * @memberof JarvilPlugin
     */
    // name: string

    // version: string
    // trigger: string | Array<string>



    constructor(
        public name: string,
        public version: string,
        public trigger: string,
        private resultItemsGetter: (...args: Array<string>) => Array<ResultItem>,
        private actionListener: (...args: Array<string>) => void
    ) { }

    public getResultItems(...args: Array<string>): Array<ResultItem> {
        return this.resultItemsGetter(...args)
    }

    public action(...args: Array<string>): void {
        return this.actionListener(...args)
    }
}
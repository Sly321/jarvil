import { ResultItem } from "../Processor"

export default interface JarvilPluginInterface {
    name: string
    version: string
    trigger: string
    getResultItems: (...args: Array<string>) => Array<ResultItem>,
    action: (...args: Array<string>) => void
}
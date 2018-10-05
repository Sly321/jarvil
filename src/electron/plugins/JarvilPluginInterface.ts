import { ResultItem } from "../Processor"

export default interface JarvilPluginInterface {
    name: string
    version: string
    trigger: string
    /**
     * Only call plugin if it was exactly triggered by the input.
     *
     * @type {boolean}
     * @memberof JarvilPluginInterface
     */
    exact?: boolean
    getResultItems: (...args: Array<string>) => Array<ResultItem>,
    action: (...args: Array<string>) => void
}
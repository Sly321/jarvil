import { ResultItem } from "../Processor"

export default interface JarvilPlugin {
    trigger: string | Array<string>
    getResultItems(...args: Array<string>): Array<ResultItem>
}
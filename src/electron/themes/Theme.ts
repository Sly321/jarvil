/**
 * Represents a launcher theme
 *
 * @export
 * @class Theme
 */
export default class Theme {
    constructor(
        public name: string,
        public css: string
    ) { }

    public toString() {
        return `Theme { name: ${name}, css: ${this.css} }`
    }
}
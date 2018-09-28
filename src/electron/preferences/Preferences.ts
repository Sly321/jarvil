import Theme from "../themes/Theme"

export default class Preferences {
    public static get selectedTheme(): Theme {
        const defaultTheme = new Theme("default", "")
        return defaultTheme
    }
}
import * as React from "react"
import ServiceFactory from "../../shared-frontend/ServiceFactory"
import Events from "../../electron/Events"
import Theme from "../../electron/themes/Theme"

export interface Props {
    children?: React.ReactNode
}

export interface State {
    themes: Array<Theme>
}

const standardCssString = `
* {
    box-sizing: border-box;
}

html, body {
    -webkit-app-region: drag;
    margin: 0;
    height: 100%;
}

body {
    width: 100%;
}

#root {
    width: 100%;
}

.launcher {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    display: flex;
}

.launcher .search-input,.result-list  {
    order: 0;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    align-self: stretch;
    margin: 0;
}

.launcher .search-input {
    width: 100%;
    height: 34px;
    font-size: 14pt;
}

.launcher .result-list {
    list-style-type: none;
    padding: 0px;
}`

export default class ThemesList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            themes: []
        }
    }

    componentDidMount() {
        const themes = ServiceFactory.Eventbus.sendSync(Events.GetThemes)
        this.setState({ themes })
    }

    render() {
        return <>
            {this.state.themes.map(theme => theme.name)}
            <iframe width={400} height={193} srcDoc={`<html>
                    <head>
                        <style>
                            ${standardCssString}
                            ${this.state.themes.map(theme => theme.css)}
                        </style>
                    </head>
                    <body>
                        <div id="root">
                            <div class="launcher">
                                <input class="search-input" tabIndex={0} value="jarvil" />
                                <ul class="result-list">
                                    <li tabindex="1" class="active">jarvil, Open Settings</li>
                                    <li tabindex="2" class="">jarvil, Close Jarvil</li>
                                </ul>
                            </div>
                        </div>
                    </body>
            </html>` } />
        </>
    }
}
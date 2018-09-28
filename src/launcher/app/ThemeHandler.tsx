import * as React from "react"
import Events from "../../electron/Events"
import ServiceFactory from "./ServiceFactory"
import { Helmet } from "react-helmet"


export interface Props {
    children?: React.ReactNode
}

export interface State {
    style: string
}

export default class ThemeHandler extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const themes = ServiceFactory.Eventbus.sendSync(Events.GetThemes)

        this.state = {
            style: themes.length === 1 ? themes[0].css : ""
        }

        console.debug(`style loaded`)
        console.debug(themes)
    }

    render() {
        return <Helmet>
            <style>
                {this.state.style}
            </style>
        </Helmet>
    }
}
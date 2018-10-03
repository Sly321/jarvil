import * as React from "react"
import Events from "../../electron/Events"
import ServiceFactory from "../../shared-frontend/ServiceFactory"
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

        const selected = ServiceFactory.Eventbus.sendSync(Events.GetSelectedTheme)

        // register event
        ServiceFactory.Eventbus.on(Events.ReloadLauncherTheme, () => {
            console.debug(`Event: Events.ReloadLauncherTheme`)
            const selected = ServiceFactory.Eventbus.sendSync(Events.GetSelectedTheme)
            this.setState({ style: selected.css })
        })

        this.state = {
            style: selected.css
        }
    }

    render() {
        return <Helmet>
            <style>
                {this.state.style}
            </style>
        </Helmet>
    }
}
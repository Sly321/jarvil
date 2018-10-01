import * as React from "react"
import JarvilPluginInterface from "../../electron/plugins/JarvilPluginInterface"
import ServiceFactory from "../../shared-frontend/ServiceFactory"
import Events from "../../electron/Events"

export interface Props {
    children?: React.ReactNode
}

export interface State {
    plugins: Array<JarvilPluginInterface>
}

export default class PluginsList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            plugins: []
        }
    }

    componentDidMount() {
        const plugins = ServiceFactory.Eventbus.sendSync(Events.GetPlugins)
        this.setState({ plugins })
    }

    render() {
        return <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Trigger</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.plugins.map(plugin => <tr key={plugin.name}>
                        <td>{plugin.name}</td>
                        <td>{plugin.version}</td>
                        <td>{plugin.trigger}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    }
}
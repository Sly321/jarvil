import * as React from "react"
import PluginsList from "./PluginsList"

export interface Props {
    children?: React.ReactNode
}

export interface State {
}

export default class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <>
                <h1>Preferences</h1>
                <nav>
                    <ul>
                        <li className="">General</li>
                        <li className="active">Plugins</li>
                        <li className="">Themes</li>
                    </ul>
                </nav>
                <main>
                    <PluginsList />
                </main>
            </>
        )
    }
}
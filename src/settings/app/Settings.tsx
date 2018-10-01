import * as React from "react"
import PluginsList from "./PluginsList"
import ThemesList from "./ThemesList"

export interface Props {
    children?: React.ReactNode
}

export interface State {
    activeIndex: number
}

export default class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }

    private handleTabClick(activeIndex: number) {
        this.setState({ activeIndex })
    }

    render() {
        return (
            <>
                <h1>Preferences</h1>
                <nav>
                    <ul>
                        <li
                            className={this.state.activeIndex === 0 ? "active" : ""}
                            onClick={this.handleTabClick.bind(this, 0)}
                        >
                            General
                        </li>
                        <li
                            className={this.state.activeIndex === 1 ? "active" : ""}
                            onClick={this.handleTabClick.bind(this, 1)}
                        >
                            Plugins
                        </li>
                        <li
                            className={this.state.activeIndex === 2 ? "active" : ""}
                            onClick={this.handleTabClick.bind(this, 2)}
                        >
                            Themes
                        </li>
                    </ul>
                </nav>
                <main>
                    {this.tabContent}
                </main>
            </>
        )
    }

    private get tabContent(): React.ReactNode {
        switch (this.state.activeIndex) {
            case 0:
                return <>General</>
            case 1:
                return <PluginsList />
            case 2:
                return <ThemesList />
            default:
                return <>empty</>
        }
    }
}
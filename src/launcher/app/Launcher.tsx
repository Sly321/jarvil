import * as React from "react"
import Events from "../../electron/Events"
import ThemeHandler from "./ThemeHandler"
import ServiceFactory from "./ServiceFactory"

export interface Props {
}

export interface State {
    resultList: Array<{ description: string, title: string }>
}

export default class Launcher extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            resultList: []
        }
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let { value } = event.target

        let resultList: Array<{ description: string, title: string }> = ServiceFactory.Eventbus.sendSync(Events.ProcessInput, value)

        this.setState({ resultList }, () => {
            const container = document.querySelector("#root")
            ServiceFactory.Eventbus.sendAsync("resize", { height: container.clientHeight, width: container.clientWidth })
        })
    }

    render() {
        return (
            <div className="launcher">
                <ThemeHandler />
                <input className="search-input" onChange={this.handleChange.bind(this)} />

                {this.showResults}
            </div>
        )
    }

    private get showResults(): any {

        let list = this.state.resultList.map((item: { description: string, title: string }, index: any) => {
            return <li>{item.title}, {item.description}</li>
        })
        return (<ul className="result-list">
            {list}
        </ul>)
    }
}
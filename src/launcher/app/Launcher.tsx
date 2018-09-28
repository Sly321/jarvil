import * as React from "react"
import Events from "../../electron/Events"

export interface Props {

}

export interface State {
    resultList: Array<{ description: string, title: string }>

}

const getEventBus = (): any => {
    console.log("return ipc")
    return (window as any).ipcRenderer
}

export default class Launcher extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            resultList: []
        }
    }

    private handleChange(event) {
        console.log("ich synce")
        let { value } = event.target
        console.log("ich synce 2", Events.ProcessInput, value)
        let resultList: Array<{ description: string, title: string }> = getEventBus().sendSync(Events.ProcessInput, value)
        console.log("ich synce 3")
        this.setState({ resultList })
    }

    render() {
        return (
            <div className="launcher">
                <input className="launcher-input" onChange={this.handleChange.bind(this)} />

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
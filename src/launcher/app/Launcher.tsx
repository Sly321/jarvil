import * as React from "react"
import Events from "../../electron/Events"
import ThemeHandler from "./ThemeHandler"
// import ThemeHandler from "./ThemeHandler"

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

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {

        let { value } = event.target

        let resultList: Array<{ description: string, title: string }> = getEventBus().sendSync(Events.ProcessInput, value)

        console.debug(resultList)

        this.setState({ resultList })

        // getEventBus().send("resize", document.querySelector("#root")!.clientWidth, document.querySelector("#root")!.clientHeight)
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
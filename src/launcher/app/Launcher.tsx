import * as React from "react"
import Events from "../../electron/Events"
import ThemeHandler from "./ThemeHandler"
import ServiceFactory from "../../shared-frontend/ServiceFactory"

export interface Props {
}

export interface State {
    activeIndex: number
    resultList: Array<{ description: string, title: string }>
}

export default class Launcher extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = this.initState()
    }

    private initState(): State {
        return {
            activeIndex: 0,
            resultList: []
        }
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target

        let state: State

        if (value !== "") {
            const resultList: Array<{ description: string, title: string }> = ServiceFactory.Eventbus.sendSync(Events.ProcessInput, value)
            state = { resultList, activeIndex: 0 }
        } else {
            state = this.initState()
        }

        this.setState(state, () => {
            const { clientHeight, clientWidth } = document.querySelector("#root")
            ServiceFactory.Eventbus.sendAsync("resize", { height: clientHeight, width: clientWidth })
        })
    }


    private handleKeyDown(event: React.KeyboardEvent) {
        let { activeIndex, resultList } = this.state


        console.log(event.keyCode)

        if (event.keyCode !== 38 && event.keyCode !== 40) {
            return
        }

        if (event.keyCode === 38 && activeIndex > 0) {
            this.setState({ activeIndex: --activeIndex })

        } else if (event.keyCode === 40 && activeIndex < resultList.length - 1) {
            this.setState({ activeIndex: ++activeIndex })
        }
    }

    render() {
        return (
            <div className="launcher">
                <ThemeHandler />
                <input className="search-input" tabIndex={0} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} />

                {this.showResults}
            </div>
        )
    }


    private get showResults(): any {

        let list = this.state.resultList.map((item: { description: string, title: string }, index: number) => {
            return <li key={index} tabIndex={index + 1} className={this.activeItem(index)}>{item.title}, {item.description}</li>
        })
        return (<ul className="result-list">
            {list}
        </ul>)
    }

    private activeItem(index: number): string {
        if (this.state.activeIndex === index) {
            return "active"
        }
        return ""
    }
}
import React, { Component } from "react"
import Events from "../../electron/Events"
import ThemeHandler from "./ThemeHandler"
import ServiceFactory from "../../shared-frontend/ServiceFactory"
import ResultList from "./ResultList"

export interface Props {
}

export interface State {
    activeIndex: number
    resultList: Array<{ description: string, title: string }>
}


enum KeyCode {
    Return = 13,
    Up = 38,
    Down = 40
}


export default class Launcher extends Component<Props, State> {

    private static allowedKeyCodes: Array<KeyCode> = [KeyCode.Return, KeyCode.Up, KeyCode.Down]

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
        console.debug(`[handleKeyDown] keyCode=${event.keyCode}`)
        // paranoia-check
        if (!Launcher.allowedKeyCodes.includes(event.keyCode)) {
            return
        }
        switch (event.keyCode) {
            case KeyCode.Up:
                this.moveUp()
                break
            case KeyCode.Down:
                this.moveDown()
                break
            case KeyCode.Return:
                this.callAction()
                break
            default: break
        }
    }

    private callAction(): void {
        const { activeIndex, resultList } = this.state
        const result = resultList[activeIndex]
        console.log(`${result.title} - ${result.description}`)
        ServiceFactory.Eventbus.sendSync(Events.ActionExecuted, result.title, result.description)
    }

    private moveUp(): void {
        let { activeIndex } = this.state
        if (activeIndex > 0) {
            this.setState({ activeIndex: --activeIndex })
            console.debug("[handleKeyDown] move up")

        }
    }

    private moveDown(): void {
        let { activeIndex, resultList } = this.state
        if (activeIndex < resultList.length - 1) {
            this.setState({ activeIndex: ++activeIndex })
            console.debug("[handleKeyDown] move down")
        }
    }

    render() {
        return (
            <div className="launcher">
                <ThemeHandler />
                <input className="search-input" tabIndex={0} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} />
                <ResultList resultList={this.state.resultList} activeIndex={this.state.activeIndex} />
            </div>
        )
    }
}

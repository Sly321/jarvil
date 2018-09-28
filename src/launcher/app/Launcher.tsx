import * as React from "react"

export interface Props {
}

export interface State {
}

export default class Launcher extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <input className="input-launcher" />
            </div>
        )
    }
}
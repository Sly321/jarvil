import * as React from "react"

export interface Props {
    children?: React.ReactNode
    resultList: Array<{ description: string, title: string }>
    activeIndex: number

}

export interface State {
}

export default class ResultList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
        }
    }




    render() {
        return (<ul className="result-list">
            {this.resultList}
        </ul>)
    }

    private get resultList(): React.ReactFragment {

        const list = this.props.resultList.map((item: { description: string, title: string }, index: number) => {
            return <li key={index} tabIndex={index + 1} className={this.activeItem(index)}>{item.title}, {item.description}</li>
        })

        return (<>
            {list}
        </>)
    }

    private activeItem(index: number): string {
        if (this.props.activeIndex === index) {
            return "active"
        }
        return ""
    }
}
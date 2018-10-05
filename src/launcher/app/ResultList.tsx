import * as React from "react"
import { ResultItem } from "../../electron/Processor"

export interface Props {
    children?: React.ReactNode
    resultList: Array<ResultItem>
    activeIndex: number

}

export default class ResultList extends React.Component<Props> {
    render() {
        return (<ul className="result-list">
            {this.resultList}
        </ul>)
    }

    private get resultList(): React.ReactFragment {

        const list = this.props.resultList.map((item: ResultItem, index: number) => {
            return <li key={index} tabIndex={index + 1} className={this.activeItem(index)}>
                {this.getImage(item)}
                <div className="content">
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                </div>
            </li>
        })

        return <>
            {list}
        </>
    }

    private getImage(item: ResultItem) {
        console.debug(`get image`, item)
        if (item.image) {
            return <img src={item.image} />
        }
        return null
    }

    private activeItem(index: number): string {
        if (this.props.activeIndex === index) {
            return "active result-item"
        }
        return "result-item"
    }
}
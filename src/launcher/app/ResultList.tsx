import * as React from "react"
import { ResultItem } from "../../electron/Processor"

export interface Props {
    children?: React.ReactNode
    resultList: Array<ResultItem>
    activeIndex: number

}

export default class ResultList extends React.Component<Props> {
    render() {
        return <>
            {this.resultList}
            {this.preview}
        </>
    }

    private get resultList(): React.ReactNode {
        const list = this.props.resultList.map((item: ResultItem, index: number) => {
            return <li key={index} tabIndex={index + 1} className={this.activeItem(index)}>
                {this.getImage(item)}
                <div className="content">
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                </div>
            </li>
        })

        if (list.length !== 0) {
            return <ul className="result-list">{list}</ul>
        }
    }

    private get preview(): React.ReactNode {
        const activeItem = this.props.resultList[this.props.activeIndex]
        if (activeItem && activeItem.preview) {
            return <div className="preview active" dangerouslySetInnerHTML={{ __html: activeItem.preview }} />
        }
    }

    private getImage(item: ResultItem) {
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
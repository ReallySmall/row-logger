import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Interfaces } from './interfaces';

export class Pager extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.increaseVisiblePaginationIndex = this.increaseVisiblePaginationIndex.bind(this);
        this.decreaseVisiblePaginationIndex = this.decreaseVisiblePaginationIndex.bind(this);
        this.state = {
            visiblePaginationIndex: 0
        };
    }

    changeItemsPerPage(event) {

        const { changePerPageAction } = this.props;

        changePerPageAction(parseInt(event.target.value, 10));

    }

    changePage(requestedPageIndex: number) {

        const { changePageAction } = this.props;

        changePageAction(requestedPageIndex);

    }

    increaseVisiblePaginationIndex() {

        const { pageLinksToShow } = this.props;

        this.setState({
            visiblePaginationIndex: this.state.visiblePaginationIndex + pageLinksToShow
        });

    }

    decreaseVisiblePaginationIndex() {

        const { pageLinksToShow } = this.props;

        this.setState({
            visiblePaginationIndex: this.state.visiblePaginationIndex - pageLinksToShow
        });

    }

    componentWillMount() {

        const { currentPage, pageLinksToShow } = this.props;

        // get the pagination index to load the component with
        let visiblePaginationIndex: number = Math.floor(currentPage / pageLinksToShow) * pageLinksToShow;

        // ensure last item in visible page range stays within visible page range on selection
        if (currentPage % pageLinksToShow === 0) {
            visiblePaginationIndex = visiblePaginationIndex - pageLinksToShow >= 0 ? visiblePaginationIndex - pageLinksToShow : 0;
        }

        this.setState({
            visiblePaginationIndex: visiblePaginationIndex
        });

    }

    render() {

        const { pageSizeOptions, pageSizeValue, pageCount, currentPage, pageLinksToShow } = this.props;
        const { visiblePaginationIndex } = this.state;

        const lastVisiblePaginationIndex: number = (Math.ceil(pageCount)) - 1;
        const pageNumbers: Array<any> = [];

        // create an array of page links with change page handlers
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(
                <li key={i}>
                    {i === currentPage && <span>{i}</span>}
                    {i !== currentPage &&
                        <button onClick={(event) => {
                            this.changePage(i);
                        }}>{i}</button>}
                </li>
            );
        }

        // calulate the page links to show
        const pageNumbersToShow: Array<any> = pageNumbers.slice(visiblePaginationIndex, visiblePaginationIndex + pageLinksToShow);

        return (

            <div className="pager">
                <div className="per-page form-control">
                    <select id="per-page" defaultValue={pageSizeValue.toString()} onChange={this.changeItemsPerPage}>
                        {pageSizeOptions.map((option, index) => {
                            return <option key={index} value={option}>{option}</option>;
                        })}
                    </select>
                    <label htmlFor="per-page">results per page</label>
                </div>
                {pageCount > 1 &&
                    <ul className="pagination plain">
                        <li>
                            <button
                                className="direction"
                                disabled={visiblePaginationIndex === 0}
                                onClick={this.decreaseVisiblePaginationIndex}>&#x2b9c;</button>
                        </li>
                        {pageNumbersToShow}
                        <li>
                            <button
                                className="direction"
                                disabled={visiblePaginationIndex + pageLinksToShow > lastVisiblePaginationIndex}
                                onClick={this.increaseVisiblePaginationIndex}>&#x2b9e;</button>
                        </li>
                    </ul>
                }
            </div>

        );
    }
}

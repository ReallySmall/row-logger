import * as React from 'react';
import * as classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { OverviewContainer } from '../../containers';
import { PageHeader, MainContentWrapper, ToolBar, Loading, Icon, GridOverview, ChartOverview } from '../../components';
import { Interfaces } from './interfaces';

export class Dashboard extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { processing, error, overallCount, currentQuery } = this.props;

        const disabled: boolean = processing ? true : false;

        return (

            <div>
                <article className="row">
                    <h3 className="visually-hidden">Dashboard</h3>
                    <Tabs
                        className="col s12 m12"
                        defaultIndex={0}
                        selectedTabClassName="active">
                        <TabList className="tabs card">
                            <Tab className="tab"><a href="#">Home</a></Tab>
                            <Tab className="tab"><a href="#">Sessions</a></Tab>
                            <Tab className="tab"><a href="#">Current session</a></Tab>
                        </TabList>
                        <div className="row">
                            <TabPanel>
                                <OverviewContainer />
                            </TabPanel>
                            <TabPanel>
                                Test
                            </TabPanel>
                            <TabPanel>
                                Test
                            </TabPanel>
                        </div>
                    </Tabs>
                </article>
            </div>

        );

    }

}

import * as React from 'react';
import * as moment from 'moment';
import * as exportRecordsActions from '../../actions/exportrecords';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ExportRecords } from '../../components';
import { Interfaces } from './interfaces';
import { utilsHelpers } from '../../helpers';
import { appConfig } from '../../config';

class ExportRecordsContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { exportActions, fieldData, items, maxSelectableItems, ids, overallCount, processing, error } = this.props;

        const exportedDate: string = moment().format(appConfig.dateFormats.fileExport);
        const fileName: string = appConfig.export.fileName + '-exported-' + exportedDate;
        const selectedIds: Array<string> = ids ? ids.filter(id => items[id] && items[id].selected) : [];
        const maxDownloadableItems: number = maxSelectableItems < overallCount ? maxSelectableItems : overallCount;

        return (

            <div>
                {overallCount > 0 &&
                    < ExportRecords
                        exportAction={exportActions.exportRequest}
                        clearExportErrorAction={exportActions.clearExportRequestError}
                        disabled={false}
                        fileName={fileName}
                        formName={fieldData.id}
                        fieldData={fieldData.fields}
                        ids={selectedIds}
                        totalRecords={maxDownloadableItems}
                        processing={processing}
                        error={error} />
                }
            </div>

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        fieldData: state.dashboard.multipleExportFields,
        ids: state.dashboard.ids,
        items: state.dashboard.items,
        maxSelectableItems: state.dashboard.maxSelectableItems,
        pageSize: state.dashboard.pageSize,
        overallCount: state.dashboard.overallCount,
        processing: state.dashboard.processing,
        error: state.dashboard.error
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        exportActions: bindActionCreators(exportRecordsActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(ExportRecordsContainer);
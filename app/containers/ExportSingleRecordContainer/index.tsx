import * as React from 'react';
import * as moment from 'moment';
import * as ExportRecordsActions from '../../actions/exportrecords';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { ExportRecords } from '../../components';
import { appConfig } from '../../config';
import { utilsHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

class ExportSingleRecordContainer extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { exportActions, fieldData, detailId, fileName, processing, error } = this.props;

        const exportedDate: string = moment().format(appConfig.dateFormats.fileExport);
        const downLoadFileName: string = fileName + '-exported-' + exportedDate;

        return (

            <ExportRecords
                exportAction={exportActions.exportRequest}
                clearExportErrorAction={exportActions.clearExportRequestError}
                disabled={false}
                fieldData={fieldData.fields}
                formName={fieldData.label}
                ids={[detailId]}
                totalRecords={1}
                fileName={downLoadFileName}
                processing={processing}
                error={error} />

        );

    }

}

// React-Redux function which injects application state into this container as props
function mapStateToProps(state: RootState, props) {
    return {
        fieldData: state.dashboard.singleExportFields,
        processing: state.dashboard.processing,
        error: state.dashboard.error
    };
}

// React-Redux function which injects actions into this container as props
function mapDispatchToProps(dispatch) {
    return {
        exportActions: bindActionCreators(ExportRecordsActions as any, dispatch)
    };
}

// Plug into the Redux application state by wrapping component with React-Redux Connect()
export default connect(mapStateToProps, mapDispatchToProps, utilsHelpers.mergePropsForConnect)(ExportSingleRecordContainer);
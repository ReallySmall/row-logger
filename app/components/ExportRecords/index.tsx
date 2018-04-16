import * as React from 'react';
import * as classNames from 'classnames';
import { FormContainer } from '../../containers/FormContainer';
import { formsHelpers, utilsHelpers } from '../../helpers';
import { appConfig } from '../../config';
import { Interfaces } from './interfaces';

export class ExportRecords extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.submit = this.submit.bind(this);
    }

    componentDidUpdate() {

        const { error, clearExportErrorAction } = this.props;

        if (error) {
            alert('Unexpected error downloading files');
            clearExportErrorAction();
        }

    }

    submit = (query: AppFormValues) => {

        const { ids, totalRecords, exportAction, fileName, fieldData } = this.props;

        const includeAddtionalData: boolean = query.includeFormData;

        const formHelper = new formsHelpers.AppFormHelper(fieldData);
        const fileData: any = formHelper.getMatchingSelectOptionData('fileType', query['fileType']);
        const exportAsIndividualFiles: boolean = fileData.exportAsIndividualFiles;
        const fileType: string = fileData.type;

        const downloadFileExt: string = '.' + (exportAsIndividualFiles && (ids.length === 0 || ids.length > 1) ? 'zip' : fileData.type);
        const singleRecordFile: boolean = (ids.length === 1 && exportAsIndividualFiles);
        const itemCount: number = ids.length ? ids.length : totalRecords;
        const batchSize: number = exportAsIndividualFiles ? appConfig.export.downloadBatchSize : totalRecords;
        const batchCount: number = exportAsIndividualFiles ? Math.ceil(itemCount / batchSize) : 1;
        const exportApi: string = utilsHelpers.getExportApi(appConfig.apis, fileType, singleRecordFile, exportAsIndividualFiles);

        if (itemCount > batchSize && exportAsIndividualFiles) {

            if (confirm('Requested files will be downloaded in ' + batchCount + ' batches of ' + batchSize)) {
                exportAction(ids, batchCount, batchSize, fileType, fileName, downloadFileExt, exportAsIndividualFiles, singleRecordFile, exportApi, includeAddtionalData);
            }

        } else {

            exportAction(ids, batchCount, batchSize, fileType, fileName, downloadFileExt, exportAsIndividualFiles, singleRecordFile, exportApi, includeAddtionalData);

        }

    }

    render() {

        const { formName, fieldData, ids, totalRecords, processing, disabled } = this.props;

        const formHelper = new formsHelpers.AppFormHelper(fieldData);
        const initialFormValues: AppFormValues = formHelper.getInitialFormValues();
        const multiple: string = ids.length > 1 ? 's' : '';
        const exportClass: string = classNames({
            'export': true,
            'disabled': disabled || processing
        });

        return (

            <div className={exportClass}>
                {ids.length > 0
                    ? <p className="bold">&#x25BC; Export {ids.length} selected record{multiple} as</p>
                    : <p className="bold">&#x25BC; Export {totalRecords} records as</p>
                }
                <div className="export_form">
                    <FormContainer
                        form={formName}
                        disabled={processing}
                        fieldData={fieldData}
                        initialValues={initialFormValues}
                        onSubmit={this.submit}
                        formControlClassNames="export_input"
                        formSubmitLabel="Download"
                        formSubmitType="primary"
                        formSubmitIcon="download"
                    />
                </div>
            </div>

        );

    }

}
// action creators are functions which return actions
// an action is a simple object which must contain a 'type' property. It may also contain other properties such as a 'data' payload
// action creators are wrapped with Redux's dispatch() to send actions to the store - this is the only way the store can be updated
// they are passed into UI components via props and normally called by a user interaction

import * as clone from 'clone';
import * as actions from '../../constants/actions';
import * as auth from './../auth';
import { appConfig } from '../../config';
import { fetchHelpers, filesHelpers } from '../../helpers';

const exportRequestSuccess = (): ReduxAction => {
    return {
        type: actions.EXPORT_RECORDS_REQUEST_SUCCESS
    };
};

const exportRequestError = (error: FetchError): ReduxAction => {
    return {
        type: actions.EXPORT_RECORDS_REQUEST_ERROR,
        data: fetchHelpers.getErrorMessageString(error)
    };
};

export const clearExportRequestError = (): ReduxAction => {
    return {
        type: actions.EXPORT_RECORDS_CLEAR_REQUEST_ERROR
    };
};

export const exportRequest = (data: Array<any>, batchCount: number, batchSize: number, fileType: string, fileName: string, fileExt: string, exportAsIndividualFiles: boolean, singleFile: boolean, exportApi: string, includeAdditionalData: boolean): Function => {

    return (dispatch, getState) => {

        // the latest data query, to modify and run again if the requested page is not yet in state
        // and the current page size in the store
        const { currentQuery } = getState().dashboard;

        // get session data
        const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);

        // this fetch function calls itself recursively
        // to get all file batches in series
        const exportMultiple = (fileIdList: Array<string>, batchCount: number, batchSize: number, batchIndex: number, exportApi: string) => {

            const api: string = window[appConfig.windowGlobalAppConfig][appConfig.apiRoot] + exportApi;
            const sessionData: string = sessionStorage.getItem(appConfig.auth.sessionState);
            const fetchOpts: FetchOptions = fetchHelpers.setPostFetchOpts(sessionData);

            let fetchBody: any = {};

            // if a record ID list has been selected manually by the user, fileIdList will contain at least one array, containing at least one form GUID
            if (fileIdList.length && fileIdList[0].length){
                fetchBody.ids = fileIdList[batchIndex];
            // otherwise get all records for the current query results
            // by passing the original search query, together with the batch size and current batch index
            } else {
                fetchBody = currentQuery;
            }

            // add batch size and index params
            fetchBody.batchSize = batchSize;
            fetchBody.batchIndex = batchIndex;

            // if include additional data flag is set
            fetchBody.includeAdditionalData = includeAdditionalData ? true : false;

            // stringify params and append to request body
            fetchBody = JSON.stringify(fetchBody);
            fetchOpts.body = fetchBody;

            if (api) {

                const batchText: string = batchCount > 1 ? ' ' + (batchIndex + 1) + ' of ' + batchCount : '';

                dispatch(<ReduxAction>{ // notify store that batch is being requested
                    type: actions.EXPORT_RECORDS_REQUEST,
                    data: 'Downloading file' + batchText
                });

                fetch(api, fetchOpts).then(response => {

                    if (!response.ok) {
                        fetchHelpers.handleFetchResponseError(response, dispatch, exportRequestError, auth.logOutRequest);
                        return;
                    }

                    response.blob().then(file => {

                        dispatch(exportRequestSuccess()); // notify store that file download was successful
                        filesHelpers.downloadFileStream(file, fileName + '_' + batchIndex + '_' + fileExt); // initialise the file download

                        const nextBatchIndex: number = batchIndex + 1;

                        // if not all batches in the file Id array have been downloaded yet
                        // recursively request the next one
                        if (nextBatchIndex < batchCount) {
                            exportMultiple(fileIdList, batchCount, batchSize, nextBatchIndex, exportApi);
                        }

                    }).catch(error => dispatch(exportRequestError(error)));

                }).catch(error => dispatch(exportRequestError(error)));

            }

        };

        if (!sessionData) {

            dispatch(auth.logOutRequest(appConfig.auth.messages.notAuthenticated));

        } else {

            // reformat form submission from application state
            // to qs format expected by api
            const fetchQuery: any = {
                formIds: data.join(),
                fileType: fileType
            };

            if (singleFile) { // if exporting a single record

                const api: string = window[appConfig.windowGlobalAppConfig][appConfig.apiRoot] + exportApi;
                const keyField: string = appConfig.data.keyField;

                dispatch(<ReduxAction>{ // notify store that batch is being requested
                    type: actions.EXPORT_RECORDS_REQUEST,
                    data: 'Downloading file'
                });

                fetch(`${api}?${keyField}=${fetchQuery.formIds}&includeAdditionalData=${includeAdditionalData}`, fetchHelpers.setGetFetchOpts(sessionData)).then(response => {

                    if (!response.ok) {
                        fetchHelpers.handleFetchResponseError(response, dispatch, exportRequestError, auth.logOutRequest);
                        return;
                    }

                    response
                        .blob()
                        .then(file => {
                            dispatch(exportRequestSuccess());
                            filesHelpers.downloadFileStream(file, fileName + fileExt); // initialise the file download
                        }).catch(error => dispatch(exportRequestError(error)));

                }).catch(error => dispatch(exportRequestError(error)));

            } else { // if exporting multiple records

                let fileIdList: Array<any> = [];
                let errors: boolean = false;

                if (exportAsIndividualFiles) {

                    // push file ids to list in batched arrays
                    for (let i: number = 0; i < data.length; i += batchSize) {
                        const downloadBatch: Array<any> = data.slice(i, i + batchSize);
                        fileIdList.push(downloadBatch);
                    }

                } else {

                    // if this export type downloads multiple records in a single file
                    fileIdList.push(data);

                }

                // export the first batch from the file list
                // this function calls itself recursively on successfully downloading a batch
                // until all batches are downloaded
                exportMultiple(fileIdList, batchCount, batchSize, 0, exportApi);

            }

        }

    };

};
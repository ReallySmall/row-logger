// get the correct api to call for the selected file export type
export const getExportApi = (apis: any, fileType: string, singleFile: boolean, exportAsIndividualFiles: boolean): string => {

    let api: string = undefined;

    switch (fileType) {

        case 'csv':
            api = apis[singleFile ? 'exportRecord' : 'exportRecords'][exportAsIndividualFiles ? 'csvDetails' : 'csvHeaders'];
            break;

        case 'pdf':
            api = apis[singleFile ? 'exportRecord' : 'exportRecords']['pdfDetails'];
            break;

    }

    return api;

};

// is the passed GUID valid?
export const isFormGuid = (guid: any) => {

    return typeof guid === 'string';
    // should we also check the string matches a GUID regex?

};

// if more items currently selected than than the max allowed
// (can happen when switching between file types and the previous file type
// had a higher max)
export const deSelectOverflowingItems = (selected: number, maxSelect: number, items: any) => {

    if (selected > maxSelect) {

        let selectedItems: number = 0;

        // after the max is reached, deselect all subsequent items
        Object.keys(items).forEach(item => {
            if (items[item].selected) {
                selectedItems++;
                if (selectedItems > maxSelect) {
                    items[item].selected = false;
                }
            }
        });

    }

    return items;

};

// deduplicate an array
export const deDupeArray = (array: Array<any>): Array<any> => {

    const deDupedArray: Array<any> = array.filter(function (item, position) {
        return array.indexOf(item) === position;
    });

    return deDupedArray;

};

// used by React-Redux @connect() - needed to stop @type from complaining
// https://github.com/Microsoft/TypeScript-React-Starter/issues/29#issuecomment-304775473
export const mergePropsForConnect = (stateProps: object, dispatchProps: object, ownProps: object): object => {

    return Object.assign({}, ownProps, stateProps, dispatchProps);

};

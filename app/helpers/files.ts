// download a file stream to a file using Blob
export const downloadFileStream = (data: any, filename: string, mime?: string): void => {

    // create a new blob
    const blob: Blob = new Blob([data], { type: mime || 'application/octet-stream' });

    if (typeof window.navigator.msSaveBlob !== 'undefined') {

        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);

    } else {

        const blobURL: string = window.URL.createObjectURL(blob); // create a blob url
        const tempLink: HTMLAnchorElement = document.createElement('a'); // create a temporary anchor

        tempLink.style.display = 'none'; // hide the anchor
        tempLink.href = blobURL; // set the url to the blob
        tempLink.setAttribute('download', filename); // set the filename

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink); // add the temp link to the page
        tempLink.click(); // and click it to get the file download started

        // a timeout seems to be required for older versions of FF
        // to catch the download
        setTimeout(function () {
            document.body.removeChild(tempLink); // remove the temp link
            window.URL.revokeObjectURL(blobURL); // wipe the blob data
        }, 100);

    }
};

// set a file asset url correctly for the current environment
export const setFilePath = (fileName: string): string => {

    const pathPrefix = __ISDEVENV__ ? '/img/' : '/dist/img/';

    return pathPrefix + fileName;

};
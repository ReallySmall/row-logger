// used by React-Redux @connect() - needed to stop @type from complaining
// https://github.com/Microsoft/TypeScript-React-Starter/issues/29#issuecomment-304775473
export const mergePropsForConnect = (stateProps: object, dispatchProps: object, ownProps: object): object => {

    return Object.assign({}, ownProps, stateProps, dispatchProps);

};

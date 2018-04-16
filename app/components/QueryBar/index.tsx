import * as React from 'react';
import * as classNames from 'classnames';
import { FormContainer } from '../../containers/FormContainer';
import { Interfaces } from './interfaces';

export class QueryBar extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { fieldData, handleSubmit } = this.props;

        return (

            <div className="filter-bar">
                <FormContainer
                    form="querybar"
                    fieldData={fieldData}
                    onSubmit={handleSubmit}
                    formWrapperClassNames=""
                    formControlClassNames="filter-bar__filter"
                    formSubmitType="primary" />
            </div>

        );

    }

}

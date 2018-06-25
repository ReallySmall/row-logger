import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export class Loading extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
    }

    render() {

        const { message } = this.props;

        return (

          <div className="loading-container">
              <CircularProgress size={100} thickness={2} />
              <Typography>{message || 'Loading'}</Typography>
          </div>

        );
    }
}

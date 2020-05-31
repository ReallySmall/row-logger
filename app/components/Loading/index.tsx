import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import * as classNames from 'classnames';
import { Interfaces } from './interfaces';

export const Loading = ({
  message = 'Loading',
  variant
}: Interfaces.Props) => {

  const isLinear: boolean = variant === 'linear';
  const align: any = isLinear ? 'left' : 'center';

  return (

    <div className="loading-container">

      {isLinear

        ? <LinearProgress color="primary" />
        : <CircularProgress size={100} thickness={2} />}

      {message &&
        <Typography align={align}>
          {message}
        </Typography>
      }
    </div>

  );

}

import * as React from 'react';
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
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div><div className="gap-patch">
                    <div className="circle" />
                  </div><div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
                <div className="spinner-layer spinner-red">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div><div className="gap-patch">
                    <div className="circle" />
                  </div><div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
                <div className="spinner-layer spinner-yellow">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div><div className="gap-patch">
                    <div className="circle" />
                  </div><div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
                <div className="spinner-layer spinner-green">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div><div className="gap-patch">
                    <div className="circle" />
                  </div><div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
              <p className="tac large-text bold">{message || 'Loading'}</p>
          </div>

        );
    }
}

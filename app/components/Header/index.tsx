import * as React from 'react';
import * as classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../components';
import * as style from './style.css';
import { filesHelpers } from '../../helpers';
import { Interfaces } from './interfaces';

export class Header extends React.Component<Interfaces.Props, Interfaces.State> {

    constructor(props?: Interfaces.Props, context?: any) {
        super(props, context);
        this.logOut = this.logOut.bind(this);
    }

    logOut(event: any) {

        const { logOutRequest } = this.props.authActions;

        event.preventDefault();
        logOutRequest();

    }

    render() {

        const { heading, isLoggedIn, children } = this.props;

        return (

            <header>
                <nav className="nav-extended">
                    <div className="nav-wrapper container">
                        <NavLink to="/" className="brand-logo">
                            <span>Row</span>
                            <span className="italic">logger</span>
                        </NavLink>
                        <ul className="right hide-on-med-and-down">
                            {isLoggedIn &&
                                <li><a href="#" className="button button-primary" onClick={this.logOut}>Log out</a></li>
                            }
                            {!isLoggedIn &&
                                <li><NavLink to="/login" className="button button-primary">Log in</NavLink></li>
                            }
                        </ul>
                    </div>
                    {children}
                </nav>
            </header>

        );
    }
}

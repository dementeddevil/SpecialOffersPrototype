import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <nav className='navbar navbar-dark bg-dark'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggler' data-toggle='collapse' data-target='.navbar-collapse' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Special Offers Prototype</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className="nav-item">
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/special-offers'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Special Offers
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>;
    }
}

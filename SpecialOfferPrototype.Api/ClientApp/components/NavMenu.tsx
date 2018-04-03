import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as FontAwesome from 'react-fontawesome';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggler' data-toggle='collapse' data-target='.navbar-collapse' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Special Offers Prototype</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <NavLink to={'/'} exact className="nav-item nav-link" activeClassName='active'>
                            <FontAwesome name='home' /> Home
                        </NavLink>
                        <NavLink to={'/special-offers'} className="nav-item nav-link" activeClassName='active'>
                            <FontAwesome name='magic' /> Special Offers
                        </NavLink>
                    </ul>
                </div>
            </nav>
        </div>;
    }
}

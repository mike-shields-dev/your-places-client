import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../../context/auth-context';

import './styles.css';

const NavLinks = props => {
    const { userId } = useContext(AuthContext);
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <ul className='nav-links'>
            <li>
                <NavLink exact to='/'>All Users</NavLink>
            </li>
            {isLoggedIn ?
                <>
                    <li>
                        <NavLink to={`/${userId}/places`}>My Places</NavLink>
                    </li>
                    <li>
                        <NavLink to='/places/new'>Add Place</NavLink>
                    </li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </>
                : 
                <li>
                    <NavLink to='/auth'>Authenticate</NavLink>
                </li>
            }
        </ul>
    );
}

export default NavLinks;

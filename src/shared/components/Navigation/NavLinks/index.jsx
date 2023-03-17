import React from "react";
import { NavLink } from 'react-router-dom';

import './styles.css';

const NavLinks = props => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink exact to='/'>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to='/user1/places'>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to='/places/new'>ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to='/auth'>AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;

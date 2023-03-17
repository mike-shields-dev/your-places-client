import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '../MainHeader';
import NavLinks from '../NavLinks';
import SideDrawer from '../SideDrawer';
import Backdrop from '../../UIElements/Backdrop';

import './styles.css';


const MainNavigation = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    
    const sideDrawer = (
        <SideDrawer>
            <nav className="main-navigation__drawer-nav">
                <NavLinks />
            </nav>
        </SideDrawer>
    );
    
    const openDrawer = () => {
        setShowSideDrawer(true);
        setShowBackdrop(true);
    };

    const closeDrawer = () => {
        setShowSideDrawer(false);
        setShowBackdrop(false);
    };

    return (
        <Fragment>
            {showBackdrop ? <Backdrop onClick={closeDrawer} /> : null}
            {showSideDrawer ? sideDrawer : null}
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    );
}

export default MainNavigation;

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../../UIElements/Backdrop';
import MainHeader from '../MainHeader';
import NavLinks from '../NavLinks';
import SideDrawer from '../SideDrawer';

import './styles.css';


const MainNavigation = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);

    const handleOpenDrawer = () => {
        setShowSideDrawer(true);
        setShowBackdrop(true);
    };

    const handleCloseDrawer = () => {
        setShowSideDrawer(false);
        setShowBackdrop(false);
    };

    return (
        <Fragment>
            <SideDrawer show={showSideDrawer} onClick={handleCloseDrawer}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SideDrawer>   
            {showBackdrop && <Backdrop onClick={handleCloseDrawer} />}
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={handleOpenDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>Your Places</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </Fragment>
    );
}

export default MainNavigation;

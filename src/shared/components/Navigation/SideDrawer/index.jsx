import React from "react";
import ReactDOM from 'react-dom';

import './styles.css';

const SideDrawer = props => {
    const content = <aside className="side-drawer">{props.children}</aside>;

    return ReactDOM
        .createPortal(
            content, document.getElementById('drawer-portal')
        );
}

export default SideDrawer;

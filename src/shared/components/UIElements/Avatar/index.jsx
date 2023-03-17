import React from 'react';
import './styles.css';

const Avatar = props => { 
    const style = {
        width: props.width,
        aspectRatio: 1,
    }

    return (
        <div className={`avatar ${props.className}`} style={props.style}>
            <img src={props.image} alt={props.alt} style={style} />
        </div>
    );
}

export default Avatar;

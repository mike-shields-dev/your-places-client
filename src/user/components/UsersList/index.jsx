import React from 'react';
import './styles.css';
import UserItem from '../UserItem';

const UsersList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No users found.</h2>
            </div>
        );
    }
    return (
        <ul className="users-list">
            {props.items.map(({ id, image, name, places }) => (
                <UserItem
                    key={id}
                    id={id}
                    image={image}
                    name={name}
                    placeCount={places}
                />
            ))}
        </ul>
    );

}

export default UsersList;
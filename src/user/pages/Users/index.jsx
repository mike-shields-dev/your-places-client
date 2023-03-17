import React from 'react';
import { UsersList } from '../../components';

const Users = () => {
    const USERS = [
        {
            id: "user1",
            name: 'User Name 1',
            places: [2],
            image: 'https://i.pravatar.cc/200'
        },
        {
            id: "user2",
            name: 'User Name 2',
            places: [5],
            image: 'https://i.pravatar.cc/200'
        },
        {
            id: "user3",
            name: 'User Name 3',
            places: [4],
            image: 'https://i.pravatar.cc/200'
        },
        {
            id: "user4",
            name: 'User Name 4',
            places: [9],
            image: 'https://i.pravatar.cc/200'
        },
    ];

    return (
        <UsersList items={USERS} />
    );
}

export default Users;
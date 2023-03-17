import React from 'react';
import { UsersList } from '../../components';

const Users = () => {
    const USERS = [
        {
            id: "user0",
            name: 'Sarah Brightman',
            places: [2],
            image: 'https://i.pravatar.cc/200?img=0'
        },
        {
            id: "user2",
            name: 'Louise Makinson',
            places: [5],
            image: 'https://i.pravatar.cc/200?img=1'
        },
        {
            id: "user3",
            name: 'James Brampton',
            places: [4],
            image: 'https://i.pravatar.cc/200?img=4'
        },
        {
            id: "user4",
            name: 'Scott Davies',
            places: [9],
            image: 'https://i.pravatar.cc/200?img=3'
        },
    ];

    return (
        <UsersList items={USERS} />
    );
}

export default Users;
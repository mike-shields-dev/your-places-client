import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../../components/PlaceList';

const PLACES = [
    {
        id: 'place0',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: 'user0',
    },
    {
        id: 'place1',
        title: 'Empire State Building',
        description: 'One of the most famous buildings in the world.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/500px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531,
        },
        creator: 'user1',
    },
];

const UserPlaces = () => {  
    const { userId } = useParams();
    const loadedPlaces = PLACES.filter(place => place.creator === userId);

    return (
        <PlaceList items={loadedPlaces} />
    );
}

export default UserPlaces;

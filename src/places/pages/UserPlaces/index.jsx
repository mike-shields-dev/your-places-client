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
        creator: 'user1',
    },
    {
        id: 'place1',
        title: 'Machu Picchu',
        description: 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views. Its exact former use remains a mystery.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Before_Machu_Picchu.jpg/1200px-Before_Machu_Picchu.jpg',
        address: 'Peru',
        location: {
            lat: -13.2263308,
            lng: -72.4995102,
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

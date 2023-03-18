import React from 'react';

import Card from '../../../shared/components/UIElements/Card';
import PlaceItem from '../PlaceItem';

import './styles.css';

const PlaceList = props => {
    if (props.items.length > 0) {
        return (
            <ul className="place-list">
                {props.items.map(place => (
                    <PlaceItem
                        key={place.id}
                        id={place.id}
                        image={place.imageUrl}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordinates={place.location}
                    /> 
                ))}
                <Card>
                    <h2>N</h2>
                </Card>
            </ul>
        );
    }
    
    return (
        <div className="place-list center">
            <Card>
                <h2>No places found. Please create one.</h2>
                <button>Share Place</button>
            </Card>
        </div>
    );
}

export default PlaceList;
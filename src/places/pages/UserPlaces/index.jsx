import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PlaceList from '../../components/PlaceList';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';

import useHttpClient from '../../../shared/hooks/useHttpClient';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => { 
    const history = useHistory(); 
    const { userId } = useParams();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [ userPlaces, setUserPlaces ] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const places = 
                    await sendRequest(
                        `http://localhost:5000/api/places/user/${userId}`
                    )

                 setUserPlaces(places);

            } catch (error) {
                console.log(error);
            }
        })();
    }, [sendRequest, userId]);

    const clearErrorHandler = () => {
        history.push('/');
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearErrorHandler} />
            
            {isLoading && <div className="center">
                <LoadingSpinner />
            </div>}

            { !isLoading && userPlaces.length > 0 && 
                <PlaceList items={userPlaces} />
            }
        </>
    );
}

export default UserPlaces;

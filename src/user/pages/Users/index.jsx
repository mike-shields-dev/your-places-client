import React, { useEffect, useState } from 'react';

import { UsersList } from '../../components';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import useHttpClient from '../../../shared/hooks/useHttpClient';


const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [uncaughtError, setUncaughtError] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
         (async () => {
            const data = 
                await sendRequest(
                    'http://localhost:5000/api/users'
                );

            setUsers(data.users);
         })();

        } catch (error) {
            setUncaughtError(error.message)
        }

    }, [sendRequest]); 

    const clearErrorHandler = () => clearError(); 

    return (
        <>
            <ErrorModal error={error || uncaughtError} onClear={clearErrorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && users && <UsersList items={users} />}
        </>
    );
}

export default Users;

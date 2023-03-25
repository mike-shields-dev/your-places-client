import React, { Fragment, useState, useContext } from 'react'
import AuthContext from '../../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';
import Modal from '../../../shared/components/UIElements/Modal';
import Map from '../../../shared/components/UIElements/Map';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import useHttpClient from '../../../shared/hooks/useHttpClient';

import './styles.css';

const PlaceItem = props => {
    const { isLoggedIn } = useContext(AuthContext);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const history = useHistory();

    const handleOpenMap = () => setShowMap(true);
    const handleCloseMap = () => setShowMap(false);

    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleHideDeleteModal = () => setShowDeleteModal(false);

    const handleDeletePlace = async () => {
        (async () => {
            try {
                await sendRequest(
                    `http://localhost:5000/api/places/${props.id}`,
                    'DELETE',
                )
                
            } catch (error) {

            }

            setShowDeleteModal(false);
            history.go(0);
        })()
    }        

    return (
        <Fragment>
            <ErrorModal error={error} clear={clearError} />
            {isLoading && <LoadingSpinner />}
            <Modal
                show={showMap}
                onCancel={handleCloseMap}
                header={props.address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-actions'
                footer={<Button onClick={handleCloseMap}>Close</Button>}
            >
                <div className='map-container'>
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal> 
            <Modal
                show={showDeleteModal}
                onCancel={handleHideDeleteModal}
                header='Are you sure?'
                footerClass='places-item__modal-actions'
                footer={<>
                    <Button onClick={handleHideDeleteModal} inverse>Cancel</Button>
                    <Button onClick={handleDeletePlace} danger>Confirm</Button>
                </>}
            >
                <p>Deleting a place cannot be undone!</p>
            </Modal>
            <li className='place-item'>
                <Card className="place-item__content">
                    <div className='place-item__image'>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={handleOpenMap}>View Map</Button>
                        {isLoggedIn && <>
                            <Button to={`/places/${props.id}`}>Edit</Button>
                            <Button onClick={handleShowDeleteModal} danger>Delete</Button>
                        </>}
                    </div>
                </Card>
            </li>
        </Fragment>
    );
}

export default PlaceItem;

import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button';

import './styles.css';

const ImageUpload = props => {
    const inputRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const clickImageInput = () => {
        inputRef.current.click();
    };

    const setChosenImage = event => {
        const { target } = event; 
        let file;
        let isFileValid;

        if(target?.files.length === 1) {
            file = event.target.files[0];

            setFile(file);
            setIsValid(true);
            isFileValid = true;
        } else {
            isFileValid = false;
            setIsValid(false);
        }
        
        props.onInput(props.id, file, isFileValid);
    }

    useEffect(() => {
        if(!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }

        fileReader.readAsDataURL(file);

    }, [file])

    return (
        <div className='form-control'>
            <input 
                ref={inputRef}
                type='file' 
                id={props.id} 
                style={{display: 'none'}} 
                accept='.jpg,.png,.jpeg'
                onChange={setChosenImage}   
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl 
                        ? <img src={previewUrl} alt="Preview" />
                        : <p>Please choose an image.</p>    
                    }
                </div>
                <Button type="button" onClick={clickImageInput}>Choose Image</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
}

export default ImageUpload;

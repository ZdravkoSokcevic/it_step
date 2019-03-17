import React, { useState } from 'react';
import pic from '../images/placeholder.png';

function InputImage(props) {
    const [showImg, setShowImg] = useState();

    function deleteImg() {
        setShowImg(null);
    }

    function setupImg(e) {
        var files = e.target.files;
        var f = files[0];

        var reader = new FileReader();

        reader.onload = (function (file) {
            return function (e) {
                setShowImg(e.target.result);
            };
        })(f);
        reader.readAsDataURL(f);
    }

    function drop(e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        var f = files[0];

        var reader = new FileReader();

        reader.onload = (function (file) {
            return function (e) {
                setShowImg(e.target.result);
            };
        })(f);
        reader.readAsDataURL(f);
    }

    function allowDrop(e) {
        e.preventDefault();
    }
    return (
        <div className='input-image'>
            <input onChange={event => setupImg(event)} hidden id='drop' type="file" accept='images/*' />
            <label htmlFor="drop">
                <div style={{ height: props.height }} onDrop={event => drop(event)} onDragOver={event => allowDrop(event)}>
                    <img src={showImg ? showImg : props.defaultPic ? props.defaultPic : pic} alt="" />
                    {showImg ?
                        <button className='full' onClick={() => deleteImg()}>X</button>
                        : null
                    }
                </div>
            </label>
        </div>
    )
}

export default InputImage;
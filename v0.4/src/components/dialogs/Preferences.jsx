import React, { useState, useEffect } from 'react';
import View from '../View';
import { Row, Col } from 'react-flexbox-grid';

function Preferences() {
    const [view, setView] = useState();
    const [x, setX] = useState('username');

    useEffect(() => {
        switch (x) {
            default: setView(<Username />); break;
            case 'username': setView(<Username />); break;
            case 'password': setView(<Password />);
        }
    })
    return (
        <div>
            <Row center='xs'>
                <Col xs={6}>
                    <button className={x === 'username' ? 'flat blue' : 'flat'} onClick={() => setX('username')}>Promena korisničkog imena</button>
                </Col>
                <Col xs={6}>
                    <button className={x === 'password' ? 'flat blue' : 'flat'} onClick={() => setX('password')}>Promena lozinke</button>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <hr className='blue' />
                </Col>
            </Row>

            <View children={view} />
        </div>
    )
}

function Username() {
    return (
        <div>
            <Row middle='xs'>
                <Col xs={6}>
                    <p>Novo korisničko ime</p>
                </Col>
                <Col align='center' xs={6}>
                    <p><input type="text" /></p>
                </Col>
            </Row>
            <Row center='xs'>
                <Col xs={12}>
                    <p><button className='full'>POTVRDI</button></p>
                </Col>
            </Row>
        </div>
    )
}

function Password() {
    return (
        <div>
            <Row middle='xs'>
                <Col xs={6}>
                    <p>Trenutna lozinka</p>
                </Col>
                <Col align='center' xs={6}>
                    <p><input type="password" /></p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}>
                    <p>Nova lozinka</p>
                </Col>
                <Col align='center' xs={6}>
                    <p><input type="password" /></p>
                </Col>
            </Row>
            <Row middle='xs'>
                <Col xs={6}>
                    <p>Ponovite lozinku</p>
                </Col>
                <Col align='center' xs={6}>
                    <p><input type="password" /></p>
                </Col>
            </Row>
            <Row center='xs'>
                <Col xs={12}>
                   <p><button className='full'>POTVRDI</button></p> 
                </Col>
            </Row>
        </div>
    )
}

export default Preferences;